import {SectionType, OutlineType, NodeType, OptionsType} from "./type";
import Section from "./section";
import Outline from "./outline";
import MakeList from "./make-list";
import {
  isSectioningRoot,
  isSectioningContent,
  isHeadingContent,
  isHidden,
  getHeadingLevel
} from "./util";

/**
 * @see https://html.spec.whatwg.org/multipage/sections.html#outline [4.3.11.1 Creating an outline]
 */
export default class DocumentOutliner {

  private currentOutlineTarget: OutlineType | null = null;
  private currentSection: SectionType | null = null;
  private readonly stack: Array<OutlineType> = [];
  private readonly rootNode: NodeType;

  constructor(root: string | NodeType) {
    if (typeof root === 'string') {
      this.rootNode = document.querySelector(root);
    } else {
      this.rootNode = root;
    }
    DocumentOutliner.walk(this.rootNode, this.enter.bind(this), this.exit.bind(this));
  }

  public getOutlineObject(): OutlineType | boolean {
    if (!this.currentOutlineTarget) {
      return false;
    }
    return this.currentOutlineTarget.getOutline();
  }

  public makeList(target: string | NodeListOf<HTMLElement>, options: OptionsType): void {
    const outline = this.getOutlineObject();
    if (!outline) {
      throw new Error('No sectioning contents.')
    }
    if (!target) {
      throw new TypeError('Invalid options: target empty.');
    }
    const makeList = new MakeList(outline as OutlineType, options);
    const html = makeList.getHtml();

    if (typeof target === 'string') {
      [].forEach.call(document.querySelectorAll(target), (dom: HTMLElement) => {
        dom.innerHTML = html;
      });
    } else if (target instanceof NodeList) {
      [].forEach.call(target, (dom: HTMLElement) => {
        dom.innerHTML = html;
      });
    } else {
      const tmp = target as HTMLElement;
      tmp.innerHTML = html;
    }
  }

  protected static walk(root: NodeType, enter: (node: NodeType) => void, exit: (node: NodeType) => void) {
    let node = root;
    start: while (node) {
      enter(node);
      if (node.firstChild) {
        node = node.firstChild;
        continue;
      }
      while (node) {
        exit(node);
        if (node === root) {
          node = null;
        } else if (node.nextSibling) {
          node = node.nextSibling;
          continue start;
        } else {
          node = node.parentNode;
        }
      }
    }
  }

  protected enter(node: NodeType): void {
    const stackTop = this.getStackTopNode();

    // If the top of the stack is a heading content element or an element with a hidden attribute
    // Do nothing.
    if (stackTop && (isHeadingContent(stackTop.getNode()) || isHidden(stackTop.getNode()))) {
      return;
    }
    // When entering an element with a hidden attribute
    // Push the element being entered onto the stack.
    // (This causes the algorithm to skip that element and any descendants of the element.)
    if (isHidden(node)) {
      this.stack.push(new Outline(node));
      return;
    }
    // When entering a sectioning content element
    if (isSectioningContent(node)) {
      // If current outline target is not null, then:
      if (this.currentOutlineTarget !== null) {
        // 1. If the current section has no heading,
        if (this.currentSection && !this.currentSection.getHeading()) {
          // create an implied heading and let that be the heading for the current section.
          this.currentSection.setHeading(document.createTextNode('No title.'));
          this.currentSection.setImplied(true);
        }
        // Push current outline target onto the stack.
        this.stack.push(this.currentOutlineTarget);
      }
      // 2. Let current outline target be the element that is being entered.
      this.currentOutlineTarget = new Outline(node);
      // 3. Let current section be a newly created section for the current outline target element.
      // 4. Associate current outline target with current section.
      this.currentSection = new Section(node);
      // 5. Let there be a new outline for the new current outline target,
      //    initialized with just the new current section as the only section in the outline.
      this.currentOutlineTarget.setOutline(new Outline(this.currentOutlineTarget.getNode(), this.currentSection));
      return;
    }
    // When entering a sectioning root element
    if (isSectioningRoot(node) || node === this.rootNode) {
      // 1. If current outline target is not null, push current outline target onto the stack.
      if (this.currentOutlineTarget !== null) {
        this.stack.push(this.currentOutlineTarget);
      }
      // 2. Let current outline target be the element that is being entered.
      this.currentOutlineTarget = new Outline(node);
      // 3. Let current outline target's parent section be current section.
      this.currentOutlineTarget.setParentSection(this.currentSection as SectionType);
      // 4. Let current section be a newly created section for the current outline target element.
      this.currentSection = new Section(node);
      // 5. Let there be a new outline for the new current outline target, initialized with just the new current section as the only section in the outline.
      this.currentOutlineTarget.setOutline(new Outline(this.currentOutlineTarget.getNode(), this.currentSection));
      return;
    }
    // When entering a heading content element
    if (isHeadingContent(node)) {
      if (this.currentSection && !this.currentSection.getHeading()) {
        // If the current section has no heading, let the element being entered be the heading for the current section.
        this.currentSection.setHeading(node);
      } else if (this.currentOutlineTarget && (0
        || this.currentOutlineTarget.getOutline().getLastSection().getImplied()
        || getHeadingLevel(node) <= getHeadingLevel(this.currentOutlineTarget.getOutline().getLastSection().getHeading())
      )) {
        // Otherwise, if the element being entered has a rank equal to or higher than the heading of the last section of the outline of the current outline target,
        // or if the heading of the last section of the outline of the current outline target is an implied heading,
        // then create a new section and
        const newSection = new Section(node);
        // append it to the outline of the current outline target element, so that this new section is the new last section of that outline.
        this.currentOutlineTarget.getOutline().addSection(newSection);
        // Let current section be that new section.
        this.currentSection = newSection;
        // Let the element being entered be the new heading for the current section.
        this.currentSection.setHeading(node);
      } else {
        // Otherwise, run these substeps:
        let abort = false;

        // 1. Let candidate section be current section.
        let candidateSection = this.currentSection as SectionType;

        // 2. Heading loop:
        let loop = 0;
        do {
          // If the element being entered has a rank lower than the rank of the heading of the candidate section,
          if (getHeadingLevel(node) > getHeadingLevel(candidateSection.getHeading())) {
            // then create a new section,
            const newSection = new Section(node);
            // and append it to candidate section. (This does not change which section is the last section in the outline.)
            candidateSection.addSection(newSection);
            // Let current section be this new section.
            this.currentSection = newSection;
            // Let the element being entered be the new heading for the current section.
            this.currentSection.setHeading(node);
            // Abort these substeps.
            abort = true;
          }
          // 3. Let new candidate section be the section that contains candidate section in the outline of current outline target.
          // 4. Let candidate section be new candidate section.
          candidateSection = candidateSection.getParent() as SectionType;
          // 5. Return to the step labeled heading loop.
          loop++;
        } while (!abort && loop < 99)
      }
      // Push the element being entered onto the stack. (This causes the algorithm to skip any descendants of the element.)
      this.stack.push(new Outline(node));
      return;
    }
  }

  protected exit(node: NodeType) {
    // When exiting an element, if that element is the element at the top of the stack
    // Note: The element being exited is a heading content element or an element with a hidden attribute.
    //   Pop that element from the stack.
    const stackTop = this.getStackTopNode();
    if (stackTop && stackTop.getNode() === node) {
      this.stack.pop();
    }
    // If the top of the stack is a heading content element or an element with a hidden attribute
    // Do nothing.
    if (stackTop && (isHeadingContent(stackTop.getNode()) || isHidden(stackTop.getNode()))) {
      return;
    }
    // When exiting a sectioning content element, if the stack is not empty
    if (isSectioningContent(node) && this.stack.length > 0) {
      // 1. If the current section has no heading, create an implied heading and let that be the heading for the current section.
      if (this.currentSection && !this.currentSection.getHeading()) {
        this.currentSection.setHeading(document.createTextNode('No title.'));
        this.currentSection.setImplied(true);
      }
      const tmpOutline = this.currentOutlineTarget as OutlineType;
      // 2. Pop the top element from the stack, and let the current outline target be that element.
      this.currentOutlineTarget = this.stack.pop() as OutlineType;
      // 3. Let current section be the last section in the outline of the current outline target element.
      this.currentSection = this.currentOutlineTarget.getOutline().getLastSection();
      // 4. Append the outline of the sectioning content element being exited to the current section. (This does not change which section is the last section in the outline.)
      tmpOutline.getOutline().getSections().forEach((section) => {
        if (this.currentSection) {
          this.currentSection.addSection(section);
        }
      });
      return;
    }
    // When exiting a sectioning root element, if the stack is not empty
    if ((isSectioningRoot(node) || node === this.rootNode) && this.stack.length > 0) {
      // 1. If the current section has no heading, create an implied heading and let that be the heading for the current section.
      if (this.currentSection && !this.currentSection.getHeading()) {
        this.currentSection.setHeading(document.createTextNode('No title.'));
        this.currentSection.setImplied(true);
      }
      // 2. Let current section be current outline target's parent section.
      if (this.currentOutlineTarget) {
        this.currentSection = this.currentOutlineTarget.getParentSection();
      }
      // 3. Pop the top element from the stack, and let the current outline target be that element.
      this.currentOutlineTarget = this.stack.pop() as OutlineType;
      return;
    }
    // When exiting a sectioning content element or a sectioning root element (when the stack is empty)
    // The current outline target is the element being exited,
    // and it is the sectioning content element or a sectioning root element
    // at the root of the subtree for which an outline is being generated.
    if (isSectioningRoot(node) || node === this.rootNode || isSectioningContent(node)) {
      // If the current section has no heading, create an implied heading and let that be the heading for the current section.
      if (this.currentSection && !this.currentSection.getHeading()) {
        this.currentSection.setHeading(document.createTextNode('No title.'));
        this.currentSection.setImplied(true);
      }
      // Skip to the next step in the overall set of steps. (The walk is over.)
      return;
    }
  }

  protected getStackTopNode(): OutlineType {
    return this.stack[this.stack.length - 1];
  }
}
