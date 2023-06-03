import DocumentOutliner from '../index';
import {OptionsType} from "../type";

declare global {
  interface JQuery {
    documentOutliner(target: string | NodeListOf<HTMLElement>, options: OptionsType): JQuery;
  }
}

(($) => {
  $.fn.documentOutliner = function(target, options) {
    const outliner = new DocumentOutliner(this.get(0));
    outliner.makeList(target, options);
    return this;
  };
})(jQuery);
