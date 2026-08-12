const ELEMENT_NODE = 1;

/**
 * 保留一批 DOM 变更根节点中的最上层元素，避免同时重复扫描父元素和其子元素。
 * 非元素节点保持原顺序，由调用方决定如何处理其文本或属性变化。
 * @param {Iterable<Node>} roots - 待处理的 DOM 根节点。
 * @returns {Node[]} 去除嵌套元素后的根节点列表。
 */
export function selectTopLevelMutationRoots(roots) {
    const candidates = Array.from(roots);
    const elementRoots = new Set(candidates.filter((root) => root?.nodeType === ELEMENT_NODE));

    return candidates.filter((root) => {
        if (root?.nodeType !== ELEMENT_NODE) return true;

        let parent = root.parentElement;
        while (parent) {
            if (elementRoots.has(parent)) return false;
            parent = parent.parentElement;
        }
        return true;
    });
}
