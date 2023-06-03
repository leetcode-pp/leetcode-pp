import {SectionType, OutlineType, OptionsType, ConfigType} from "./type";
import {isHeadingContent} from "./util";

export default class MakeList {
  private readonly outline: OutlineType;
  private readonly options: ConfigType;
  private anchor: number = 1;
  private html: string = '';

  constructor(outline: OutlineType, options: OptionsType) {
    this.outline = outline;
    this.options = Object.assign({}, {
      link: true,
      listType: 'ol',
      levelLimit: 99,
      listClassName: '',
      itemClassName: '',
      exceptClass: '',
      anchorName: 'header-$1'
    }, options) as ConfigType;
  }

  public getHtml(): string {
    if (!this.outline) {
      throw new Error("No sectioning contents.");
    }
    this.build(this.outline.getOutline(), 1);
    return this.html;
  }

  protected getListType(level: number): string {
    let defaultType = 'ol';
    if (typeof this.options.listType === 'string') {
      if (/ol|ul/.test(this.options.listType)) {
        return this.options.listType;
      }
    } else if (Array.isArray(this.options.listType)) {
      if (/ol|ul/.test(this.options.listType[0])) {
        defaultType =  this.options.listType[0];
      }
      const type = this.options.listType[level];
      if (/ol|ul/.test(type)) {
        return type;
      }
    }
    return defaultType;
  }

  protected build(outline: OutlineType | SectionType, level: number): void {
    if (level > this.options.levelLimit) {
      return;
    }
    const hasHeading = this.hasHeading(outline.getSections());
    if (hasHeading) {
      const listClassName = this.options.listClassName ? ` ${this.options.listClassName}` : '';
      this.html += `<${this.getListType(level - 1)} class="level-${level}${listClassName}">`;
    }
    this.buildSections(outline.getSections(), hasHeading, level);
    if (hasHeading) {
      this.html += `</${this.getListType(level)}>`;
    }
  }

  protected buildSections(sections: Array<SectionType>, hasHeading: boolean, level: number): void {
    sections.forEach((section) => {
      const heading = section.getHeading() as HTMLElement;
      const nextLevel = hasHeading ? level + 1 : level;
      if (isHeadingContent(heading) && !heading.classList.contains(this.options.exceptClass)) {
        const itemClassName = this.options.itemClassName ? ` class="${this.options.itemClassName}"` : '';
        if (this.options.link) {
          this.html += `<li${itemClassName}>${this.buildLink(heading)}`;
        } else {
          this.html += `<li${itemClassName}>${heading.innerHTML}`;
        }
        if (section.getSections().length > 0) {
          this.build(section, nextLevel);
        }
        this.html += '</li>';
      } else if (section.getSections().length > 0) {
        if (hasHeading) {
          this.html += '<li>';
        }
        const tmp = this.html;
        this.build(section, nextLevel);
        if (tmp === this.html) {
          this.html = this.html.slice(0, '<li>'.length * -1);
        }
        if (hasHeading) {
          this.html += '</li>';
        }
      }
    });
  }

  protected buildLink(heading: HTMLElement): string {
    const anchorClassName = this.options.linkClassName ? ` class="${this.options.linkClassName}"` : '';
    let anchorName = this.options.anchorName.replace(/\$1/, this.anchor.toString());
    if (heading.id) {
      anchorName = heading.id;
    } else {
      heading.id = anchorName;
    }
    this.anchor++;
    return `<a href="#${anchorName}"${anchorClassName}>${heading.innerHTML}</a>`;
  }

  protected hasHeading(sections: Array<SectionType>): boolean {
    let hasHeading = false;
    sections.forEach((section) => {
      const heading = section.getHeading();
      if (heading
        && isHeadingContent(heading)
        && heading instanceof HTMLElement
        && !heading.classList.contains(this.options.exceptClass)
      ) {
        hasHeading = true;
      }
    });
    return hasHeading;
  }
}
