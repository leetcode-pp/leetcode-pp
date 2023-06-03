import DocumentOutliner from '../index';
(function ($) {
    $.fn.documentOutliner = function (target, options) {
        var outliner = new DocumentOutliner(this.get(0));
        outliner.makeList(target, options);
        return this;
    };
})(jQuery);
//# sourceMappingURL=jquery.js.map