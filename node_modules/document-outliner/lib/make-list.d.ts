import { SectionType, OutlineType, OptionsType } from "./type";
export default class MakeList {
    private readonly outline;
    private readonly options;
    private anchor;
    private html;
    constructor(outline: OutlineType, options: OptionsType);
    getHtml(): string;
    protected getListType(level: number): string;
    protected build(outline: OutlineType | SectionType, level: number): void;
    protected buildSections(sections: Array<SectionType>, hasHeading: boolean, level: number): void;
    protected buildLink(heading: HTMLElement): string;
    protected hasHeading(sections: Array<SectionType>): boolean;
}
