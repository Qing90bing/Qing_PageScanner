/**
 * UI 组件共用的静态参数。
 *
 * 这些值只描述动画、布局和反馈时长，不负责翻译文本，也不保存用户偏好。
 * 修改后需要通过构建和 UI 回归测试确认视觉边界没有变化。
 */
export const uiConfig = Object.freeze({
    fab: Object.freeze({ animationDelayMs: 50 }),
    modal: Object.freeze({ contentHeight: '400px' }),
    notification: Object.freeze({ durationMs: 3000 }),
});
