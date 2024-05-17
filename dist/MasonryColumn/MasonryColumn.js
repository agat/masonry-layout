export class MasonryColumn {
    constructor(x, width, options) {
        this.innerItems = [];
        this.innerHeight = 0;
        if (x < 0) {
            throw new Error('X must be greater than or equal to zero');
        }
        if (width <= 0) {
            throw new Error('Width must be greater than zero');
        }
        this.x = x;
        this.width = width;
        this.options = Object.freeze(options);
    }
    get bottom() {
        var _a, _b;
        if (this.height === 0) {
            return 0;
        }
        return this.height + ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.space) !== null && _b !== void 0 ? _b : 0);
    }
    get height() {
        return this.innerHeight;
    }
    get items() {
        return this.innerItems;
    }
    getNewItemRect(item) {
        var _a;
        const rect = {
            x: this.x,
            y: this.bottom,
            width: (_a = item.size.width) !== null && _a !== void 0 ? _a : this.width,
            height: item.size.height,
        };
        if (item.size.width !== this.width) {
            // Resize
            rect.height *= this.width / rect.width;
            rect.width = this.width;
        }
        return rect;
    }
    insert(item) {
        const rect = this.getNewItemRect(item);
        this.innerItems.push({ data: item.data, rect });
        this.innerHeight = rect.y + rect.height;
    }
}
//# sourceMappingURL=MasonryColumn.js.map