import { AI_CANDIDATE_STATUS, createCandidateFingerprint } from '../../shared/services/ai/contracts.js';
import { normalizeAiSourceText } from '../../shared/services/ai/candidateText.js';
import { isHiddenOutputStatus } from './resultView.js';

const MAX_MANUAL_SOURCE_LENGTH = 100000;

function normalizeSourceList(sourceTexts) {
    return Array.from(
        new Set(
            sourceTexts
                .map((sourceText) => normalizeAiSourceText(sourceText).slice(0, MAX_MANUAL_SOURCE_LENGTH))
                .filter(Boolean)
        )
    );
}

export function createManualSummaryCandidate(sourceText, { siteKey, targetLanguage }) {
    const normalizedSourceText = normalizeAiSourceText(sourceText).slice(0, MAX_MANUAL_SOURCE_LENGTH);
    if (!normalizedSourceText) return null;
    const fingerprint = createCandidateFingerprint(siteKey, targetLanguage, normalizedSourceText);
    return {
        id: `ai-manual-${fingerprint}-${normalizedSourceText.length}`,
        sourceText: normalizedSourceText,
        siteKey,
        targetLanguage,
        fingerprint,
        context: {},
        status: AI_CANDIDATE_STATUS.PENDING,
        origin: 'summary-editor',
    };
}

export function reconcileAiSummarySources(sourceTexts, currentCandidates, protectedCandidateIds = []) {
    const remainingSourceTexts = normalizeSourceList(Array.isArray(sourceTexts) ? sourceTexts : []);
    const remaining = new Set(remainingSourceTexts);
    const protectedIds = new Set(protectedCandidateIds);
    const candidatesBySource = new Map();

    currentCandidates.forEach((candidate) => {
        const sourceText = normalizeAiSourceText(candidate?.sourceText);
        if (!sourceText) return;
        const matches = candidatesBySource.get(sourceText) || [];
        matches.push(candidate);
        candidatesBySource.set(sourceText, matches);
    });

    const addedSourceTexts = [];
    const revivedCandidateIds = [];
    remainingSourceTexts.forEach((sourceText) => {
        const matches = candidatesBySource.get(sourceText) || [];
        if (matches.some((candidate) => protectedIds.has(candidate.id) || !isHiddenOutputStatus(candidate.status))) {
            return;
        }
        const hiddenCandidate = matches.find((candidate) => isHiddenOutputStatus(candidate.status));
        if (hiddenCandidate) revivedCandidateIds.push(hiddenCandidate.id);
        else addedSourceTexts.push(sourceText);
    });

    const removedCandidateIds = currentCandidates
        .filter(
            (candidate) =>
                !protectedIds.has(candidate.id) &&
                !isHiddenOutputStatus(candidate.status) &&
                !remaining.has(normalizeAiSourceText(candidate.sourceText))
        )
        .map((candidate) => candidate.id);

    return { addedSourceTexts, revivedCandidateIds, removedCandidateIds };
}
