var Outline = /** @class */ (function () {
    function Outline(node, section) {
        if (section === void 0) { section = null; }
        this.sections = [];
        this.parentSection = null;
        this.node = null;
        this.outline = this;
        this.setNode(node);
        if (section) {
            this.addSection(section);
        }
    }
    Outline.prototype.getOutline = function () {
        return this.outline;
    };
    Outline.prototype.setOutline = function (outline) {
        this.outline = outline;
    };
    Outline.prototype.getSections = function () {
        return this.sections;
    };
    Outline.prototype.setSections = function (sections) {
        this.sections = sections;
    };
    Outline.prototype.addSection = function (section) {
        this.sections.push(section);
    };
    Outline.prototype.setParentSection = function (section) {
        this.parentSection = section;
    };
    Outline.prototype.getParentSection = function () {
        return this.parentSection;
    };
    Outline.prototype.getLastSection = function () {
        return this.sections[this.sections.length - 1];
    };
    Outline.prototype.setNode = function (node) {
        this.node = node;
    };
    Outline.prototype.getNode = function () {
        return this.node;
    };
    return Outline;
}());
export default Outline;
//# sourceMappingURL=outline.js.map