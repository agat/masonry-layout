import { MasonryColumn } from '../MasonryColumn/MasonryColumn';
export class MasonryGrid {
    constructor(items, width, columns, options = {}, ColumnClass = MasonryColumn) {
        var _a;
        this.columns = [];
        if (!Array.isArray(items)) {
            throw new Error('Items must be an array');
        }
        if (columns <= 0 || width <= 0) {
            throw new Error('Columns or width must be greater than zero');
        }
        if (columns > width) {
            throw new Error('Columns must be smallest or equal than width');
        }
        const space = (_a = options.space) !== null && _a !== void 0 ? _a : 0;
        const colWidth = MasonryGrid.getColumnWidth(columns, width, space);
        this.columns = Array.from({ length: columns }, (_c, index) => new ColumnClass(index * (colWidth + space), colWidth, options));
        for (const item of items) {
            this.shortest.insert(item);
        }
    }
    getShortestColumns() {
        return this.columns.slice().sort((a, b) => a.height - b.height);
    }
    get shortest() {
        return this.getShortestColumns()[0];
    }
    get longest() {
        return this.getShortestColumns().reverse()[0];
    }
    get items() {
        return this.columns
            .flatMap((c) => c.items)
            .sort((a, b) => {
            return a.rect.y - b.rect.y;
        });
    }
}
MasonryGrid.getColumnWidth = (columns, width, space) => (width + space) / columns - space;
//# sourceMappingURL=MasonryGrid.js.map