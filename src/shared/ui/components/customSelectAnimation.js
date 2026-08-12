export const CUSTOM_SELECT_OPTIONS_MAX_HEIGHT = 200;

export function getCustomSelectOptionsMaxHeight(contentHeight) {
    const numericHeight = Number(contentHeight);
    if (!Number.isFinite(numericHeight) || numericHeight <= 0) {
        return CUSTOM_SELECT_OPTIONS_MAX_HEIGHT;
    }

    return Math.min(numericHeight, CUSTOM_SELECT_OPTIONS_MAX_HEIGHT);
}
