import {NodeType, SectionType} from "./type";

export default class Section {

  protected node: NodeType = null;
  protected implied: boolean = false;
  protected heading: NodeType = null;
  protected parent: SectionType | null = null;
  protected sections: Array<SectionType> = [];

  constructor(node: NodeType) {
    this.setNode(node);
  }

  public getNode(): NodeType {
    return this.node;
  }

  public setNode(node: NodeType) {
    this.node = node;
  }

  public getImplied(): boolean {
    return this.implied;
  }

  public setImplied(implied: boolean) {
    this.implied = implied;
  }

  public getHeading(): NodeType {
    return this.heading;
  }

  public setHeading(heading: NodeType) {
    this.heading = heading;
  }

  public getParent(): SectionType | null {
    return this.parent;
  }

  public setParent(section: SectionType) {
    this.parent = section;
  }

  public getSections(): Array<SectionType> {
    return this.sections;
  }

  public addSection(section: SectionType) {
    section.parent = this;
    this.sections.push(section);
  }
}
