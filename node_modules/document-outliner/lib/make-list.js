import { isHeadingContent } from "./util";
var MakeList = /** @class */ (function () {
    function MakeList(outline, options) {
        this.anchor = 1;
        this.html = '';
        this.outline = outline;
        this.options = Object.assign({}, {
            link: true,
            listType: 'ol',
            levelLimit: 99,
            listClassName: '',
            itemClassName: '',
            exceptClass: '',
            anchorName: 'header-$1'
        }, options);
    }
    MakeList.prototype.getHtml = function () {
        if (!this.outline) {
            throw new Error("No sectioning contents.");
        }
        this.build(this.outline.getOutline(), 1);
        return this.html;
    };
    MakeList.prototype.getListType = function (level) {
        var defaultType = 'ol';
        if (typeof this.options.listType === 'string') {
            if (/ol|ul/.test(this.options.listType)) {
                return this.options.listType;
            }
        }
        else if (Array.isArray(this.options.listType)) {
            if (/ol|ul/.test(this.options.listType[0])) {
                defaultType = this.options.listType[0];
            }
            var type = this.options.listType[level];
            if (/ol|ul/.test(type)) {
                return type;
            }
        }
        return defaultType;
    };
    MakeList.prototype.build = function (outline, level) {
        if (level > this.options.levelLimit) {
            return;
        }
        var hasHeading = this.hasHeading(outline.getSections());
        if (hasHeading) {
            var listClassName = this.options.listClassName ? " " + this.options.listClassName : '';
            this.html += "<" + this.getListType(level - 1) + " class=\"level-" + level + listClassName + "\">";
        }
        this.buildSections(outline.getSections(), hasHeading, level);
        if (hasHeading) {
            this.html += "</" + this.getListType(level) + ">";
        }
    };
    MakeList.prototype.buildSections = function (sections, hasHeading, level) {
        var _this = this;
        sections.forEach(function (section) {
            var heading = section.getHeading();
            var nextLevel = hasHeading ? level + 1 : level;
            if (isHeadingContent(heading) && !heading.classList.contains(_this.options.exceptClass)) {
                var itemClassName = _this.options.itemClassName ? " class=\"" + _this.options.itemClassName + "\"" : '';
                if (_this.options.link) {
                    _this.html += "<li" + itemClassName + ">" + _this.buildLink(heading);
                }
                else {
                    _this.html += "<li" + itemClassName + ">" + heading.innerHTML;
                }
                if (section.getSections().length > 0) {
                    _this.build(section, nextLevel);
                }
                _this.html += '</li>';
            }
            else if (section.getSections().length > 0) {
                if (hasHeading) {
                    _this.html += '<li>';
                }
                var tmp = _this.html;
                _this.build(section, nextLevel);
                if (tmp === _this.html) {
                    _this.html = _this.html.slice(0, '<li>'.length * -1);
                }
                if (hasHeading) {
                    _this.html += '</li>';
                }
            }
        });
    };
    MakeList.prototype.buildLink = function (heading) {
        var anchorClassName = this.options.linkClassName ? " class=\"" + this.options.linkClassName + "\"" : '';
        var anchorName = this.options.anchorName.replace(/\$1/, this.anchor.toString());
        if (heading.id) {
            anchorName = heading.id;
        }
        else {
            heading.id = anchorName;
        }
        this.anchor++;
        return "<a href=\"#" + anchorName + "\"" + anchorClassName + ">" + heading.innerHTML + "</a>";
    };
    MakeList.prototype.hasHeading = function (sections) {
        var _this = this;
        var hasHeading = false;
        sections.forEach(function (section) {
            var heading = section.getHeading();
            if (heading
                && isHeadingContent(heading)
                && heading instanceof HTMLElement
                && !heading.classList.contains(_this.options.exceptClass)) {
                hasHeading = true;
            }
        });
        return hasHeading;
    };
    return MakeList;
}());
export default MakeList;
//# sourceMappingURL=make-list.js.map