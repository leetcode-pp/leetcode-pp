var Section = /** @class */ (function () {
    function Section(node) {
        this.node = null;
        this.implied = false;
        this.heading = null;
        this.parent = null;
        this.sections = [];
        this.setNode(node);
    }
    Section.prototype.getNode = function () {
        return this.node;
    };
    Section.prototype.setNode = function (node) {
        this.node = node;
    };
    Section.prototype.getImplied = function () {
        return this.implied;
    };
    Section.prototype.setImplied = function (implied) {
        this.implied = implied;
    };
    Section.prototype.getHeading = function () {
        return this.heading;
    };
    Section.prototype.setHeading = function (heading) {
        this.heading = heading;
    };
    Section.prototype.getParent = function () {
        return this.parent;
    };
    Section.prototype.setParent = function (section) {
        this.parent = section;
    };
    Section.prototype.getSections = function () {
        return this.sections;
    };
    Section.prototype.addSection = function (section) {
        section.parent = this;
        this.sections.push(section);
    };
    return Section;
}());
export default Section;
//# sourceMappingURL=section.js.map