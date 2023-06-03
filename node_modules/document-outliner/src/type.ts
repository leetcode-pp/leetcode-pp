import Outline from "./outline";
import Section from "./section";

type OutlineType = Outline;
type SectionType = Section;
type NodeType = HTMLElement | Node | ChildNode | null;
type ListOptionType = 'ul' | 'ol';
type ConfigType = {
  link: boolean,
  listType: ListOptionType,
  listClassName: string,
  itemClassName: string,
  linkClassName: string,
  exceptClass: string,
  anchorName: string,
  levelLimit: number
};
type Partial<T> = {
  [P in keyof T]?: T[P];
};
type OptionsType = Partial<ConfigType>

export {OutlineType, SectionType, NodeType, OptionsType, ConfigType};
