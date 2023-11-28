export const hasKeyword = (content: string, target: string) =>
  content.toLowerCase().includes(target.toLocaleLowerCase());
