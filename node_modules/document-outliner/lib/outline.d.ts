import { SectionType, OutlineType, NodeType } from "./type";
declare type SectionsType = Array<SectionType>;
export default class Outline {
    protected sections: SectionsType;
    protected parentSection: SectionType | null;
    protected node: NodeType;
    protected outline: OutlineType;
    constructor(node: NodeType, section?: SectionType | null);
    getOutline(): OutlineType;
    setOutline(outline: OutlineType): void;
    getSections(): SectionsType;
    setSections(sections: SectionsType): void;
    addSection(section: SectionType): void;
    setParentSection(section: SectionType): void;
    getParentSection(): SectionType | null;
    getLastSection(): SectionType;
    setNode(node: NodeType): void;
    getNode(): NodeType;
}
export {};
