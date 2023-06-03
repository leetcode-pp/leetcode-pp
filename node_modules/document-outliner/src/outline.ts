import {SectionType, OutlineType, NodeType} from "./type";

type SectionsType = Array<SectionType>;

export default class Outline {

  protected sections: SectionsType = [];
  protected parentSection: SectionType | null = null;
  protected node: NodeType = null;
  protected outline: OutlineType = this;

  constructor(node: NodeType, section: SectionType | null = null) {
    this.setNode(node);
    if (section) {
      this.addSection(section);
    }
  }

  public getOutline(): OutlineType {
    return this.outline;
  }

  public setOutline(outline: OutlineType) {
    this.outline = outline;
  }

  public getSections(): SectionsType {
    return this.sections;
  }

  public setSections(sections: SectionsType) {
    this.sections = sections;
  }

  public addSection(section: SectionType): void {
    this.sections.push(section);
  }

  public setParentSection(section: SectionType): void {
    this.parentSection = section;
  }

  public getParentSection(): SectionType | null {
    return this.parentSection;
  }

  public getLastSection(): SectionType {
    return this.sections[this.sections.length - 1];
  }

  public setNode(node: NodeType): void {
    this.node = node;
  }

  public getNode(): NodeType {
    return this.node;
  }
}
