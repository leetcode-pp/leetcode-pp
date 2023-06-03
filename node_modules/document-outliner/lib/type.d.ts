import Outline from "./outline";
import Section from "./section";
declare type OutlineType = Outline;
declare type SectionType = Section;
declare type NodeType = HTMLElement | Node | ChildNode | null;
declare type ListOptionType = 'ul' | 'ol';
declare type ConfigType = {
    link: boolean;
    listType: ListOptionType;
    listClassName: string;
    itemClassName: string;
    linkClassName: string;
    exceptClass: string;
    anchorName: string;
    levelLimit: number;
};
declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
declare type OptionsType = Partial<ConfigType>;
export { OutlineType, SectionType, NodeType, OptionsType, ConfigType };
