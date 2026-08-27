const LINE_HEIGHT_PX = 20;

export const calculateLineCount = (contentElement: HTMLElement): number => {
  const rawHeight = contentElement.scrollHeight;
  const contentHeight = Math.round(rawHeight);

  return Math.floor(contentHeight / LINE_HEIGHT_PX);
};
