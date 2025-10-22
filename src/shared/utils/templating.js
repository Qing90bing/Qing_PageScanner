// src/shared/utils/templating.js

/**
 * 一个简单的模板字符串替换函数。
 * @param {string} template - 模板字符串，例如 "你好, {name}"。
 * @param {object} values - 包含替换值的对象, 例如 { name: "世界" }。
 * @returns {string} - 格式化后的字符串。
 */
export const simpleTemplate = (template, values) => {
    if (!template) return '';
    return template.replace(/{(\w+)}/g, (match, key) => {
        return values.hasOwnProperty(key) ? values[key] : match;
    });
};
