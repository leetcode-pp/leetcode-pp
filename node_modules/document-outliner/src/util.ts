import {NodeType} from "./type";

const isElement = (el: NodeType): boolean => {
  return !!(el && el.nodeName);
};

const checkTagWithRegex = (el: NodeType, regex: RegExp): boolean => {
  if (el === null) {
    return false;
  }
  if (!(el instanceof HTMLElement)) {
    return false;
  }
  return isElement(el) && regex.test(el.tagName.toLowerCase());
};

const isSectioningRoot = (el: NodeType): boolean => {
  return checkTagWithRegex(el, /^(blockquote|body|details|fieldset|figure|td)$/);
};

const isSectioningContent = (el: NodeType): boolean => {
  return checkTagWithRegex(el, /^(article|aside|nav|section)$/);
};

const isHeadingContent = (el: NodeType): boolean => {
  return checkTagWithRegex(el, /^(h1|h2|h3|h4|h5|h6)$/);
};

const isHidden = (el: NodeType): boolean => {
  if (el === null) {
    return false;
  }
  if (!(el instanceof HTMLElement)) {
    return false;
  }
  return isElement(el) && el.hasAttribute('hidden');
};

const getHeadingLevel = (el: NodeType): number => {
  if (!(el instanceof HTMLElement) || !isHeadingContent(el)) {
    return 0;
  }
  return parseInt(el.tagName.toLowerCase().substr(1));
};

export { isSectioningRoot, isSectioningContent, isHeadingContent, isHidden, getHeadingLevel };
