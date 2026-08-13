import { updateModalContent } from '../../shared/ui/mainModal/index.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import { extractRawTextFromElement } from '../../shared/utils/text/textProcessor.js';
import { formatTextsForTranslation } from '../../shared/utils/text/formatting.js';
import { loadSettings } from '../../shared/services/settings.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t } from '../../shared/i18n/index.js';
import { simpleTemplate } from '../../shared/utils/dom/templating.js';
import { log } from '../../shared/utils/core/logger.js';
import { filterTextsWithWorker, resetTextFilterState, terminateTextFilterWorker } from './textFilter.js';
import { playScanConfirmationAnimation, playScanErrorAnimation, playScanPulseAnimation } from './ui.js';

export function createElementStagingController({ state, selectionController, textStore, onStop }) {
    async function stageCurrentElement() {
        const currentTarget = selectionController.getCurrentTarget();
        if (!currentTarget) return;

        log(t('log.elementScan.stagingStarted', { tagName: currentTarget.tagName }));
        const rawTexts = extractRawTextFromElement(currentTarget);
        const settings = await loadSettings();

        try {
            const filteredTexts = await filterTextsWithWorker(rawTexts, settings);
            if (filteredTexts.length > 0) {
                textStore.add(filteredTexts);
                log(t('log.elementScan.staged', { count: filteredTexts.length, total: state.stagedTexts.size }));
                playScanPulseAnimation();
            } else {
                log(t('log.elementScan.stagedNothingNew'));
                playScanErrorAnimation();
            }
        } catch (error) {
            log(t('log.elementScan.processingError', { error: error.message }), 'error');
            showNotification(t('notifications.scanFailed'), { type: 'error' });
        }

        log(t('log.elementScan.stagingFinished'));
        selectionController.reselect();
    }

    async function confirmSelectionAndExtract() {
        const currentTarget = selectionController.getCurrentTarget();
        if (!currentTarget) {
            log(t('log.elementScan.confirmFailedNoTarget'));
            return;
        }

        log(t('log.elementScan.confirmStarted'));
        selectionController.setAdjusting(true);
        const rawTexts = extractRawTextFromElement(currentTarget);
        const settings = await loadSettings();

        try {
            const filteredTexts = await filterTextsWithWorker(rawTexts, settings);
            textStore.add(filteredTexts);
        } catch (error) {
            log(t('log.elementScan.processingError', { error: error.message }), 'error');
            showNotification(t('notifications.scanFailed'), { type: 'error' });
            onStop();
            return;
        }

        const totalToProcess = state.stagedTexts.size;
        log(simpleTemplate(t('log.elementScan.confirmingStaged'), { count: totalToProcess }));
        playScanConfirmationAnimation(() => {
            selectionController.setAdjusting(true);
            selectionController.prepareForModal();
            selectionController.setShouldResumeAfterModalClose(true);

            try {
                const allTexts = textStore.getAll();
                log(simpleTemplate(t('log.elementScan.extractedCount'), { count: allTexts.length }));
                const { outputFormat, includeArrayBrackets, tabSize } = settings;
                const formattedText = formatTextsForTranslation(allTexts, outputFormat, {
                    includeArrayBrackets,
                    tabSize,
                });
                const count = allTexts.length;

                updateModalContent(formattedText, true, 'element-scan');
                updateScanCount(count, 'element');
                showNotification(simpleTemplate(t('scan.elementFinished'), { count }), { type: 'success' });
                log(t('log.elementScan.confirmFinished'));
            } catch (error) {
                log(t('log.elementScan.confirmFailed', { error: error.message }), 'error');
                showNotification(t('notifications.scanFailed'), { type: 'error' });
                onStop();
            }
        });
    }

    return {
        confirmSelectionAndExtract,
        resetWorker: () => {
            terminateTextFilterWorker();
            resetTextFilterState();
        },
        stageCurrentElement,
    };
}
