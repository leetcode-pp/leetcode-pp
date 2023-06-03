var isElement = function (el) {
    return !!(el && el.nodeName);
};
var checkTagWithRegex = function (el, regex) {
    if (el === null) {
        return false;
    }
    if (!(el instanceof HTMLElement)) {
        return false;
    }
    return isElement(el) && regex.test(el.tagName.toLowerCase());
};
var isSectioningRoot = function (el) {
    return checkTagWithRegex(el, /^(blockquote|body|details|fieldset|figure|td)$/);
};
var isSectioningContent = function (el) {
    return checkTagWithRegex(el, /^(article|aside|nav|section)$/);
};
var isHeadingContent = function (el) {
    return checkTagWithRegex(el, /^(h1|h2|h3|h4|h5|h6)$/);
};
var isHidden = function (el) {
    if (el === null) {
        return false;
    }
    if (!(el instanceof HTMLElement)) {
        return false;
    }
    return isElement(el) && el.hasAttribute('hidden');
};
var getHeadingLevel = function (el) {
    if (!(el instanceof HTMLElement) || !isHeadingContent(el)) {
        return 0;
    }
    return parseInt(el.tagName.toLowerCase().substr(1));
};
export { isSectioningRoot, isSectioningContent, isHeadingContent, isHidden, getHeadingLevel };
//# sourceMappingURL=util.js.map