const LINE_HEIGHT_PX = 20;

export const calculateLineCount = (contentElement: HTMLElement): number => {
  const styles = getComputedStyle(contentElement);
  const paddingTop = parseFloat(styles.paddingTop);
  const paddingBottom = parseFloat(styles.paddingBottom);
  const rawHeight = contentElement.scrollHeight - paddingTop - paddingBottom;
  const contentHeight = Math.round(rawHeight);

  return Math.floor(contentHeight / LINE_HEIGHT_PX);
};
