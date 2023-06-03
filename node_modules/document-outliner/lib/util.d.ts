import { NodeType } from "./type";
declare const isSectioningRoot: (el: NodeType) => boolean;
declare const isSectioningContent: (el: NodeType) => boolean;
declare const isHeadingContent: (el: NodeType) => boolean;
declare const isHidden: (el: NodeType) => boolean;
declare const getHeadingLevel: (el: NodeType) => number;
export { isSectioningRoot, isSectioningContent, isHeadingContent, isHidden, getHeadingLevel };
