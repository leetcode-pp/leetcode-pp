import { NodeType, SectionType } from "./type";
export default class Section {
    protected node: NodeType;
    protected implied: boolean;
    protected heading: NodeType;
    protected parent: SectionType | null;
    protected sections: Array<SectionType>;
    constructor(node: NodeType);
    getNode(): NodeType;
    setNode(node: NodeType): void;
    getImplied(): boolean;
    setImplied(implied: boolean): void;
    getHeading(): NodeType;
    setHeading(heading: NodeType): void;
    getParent(): SectionType | null;
    setParent(section: SectionType): void;
    getSections(): Array<SectionType>;
    addSection(section: SectionType): void;
}
