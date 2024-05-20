import { MasonryColumn } from '../MasonryColumn/MasonryColumn.js';
import type { ItemType, OptionsType } from '../types.js';

export class MasonryGrid<T> {
    readonly columns: MasonryColumn<T>[] = [];

    constructor(
        items: ItemType<T>[],
        width: number,
        columns: number,
        options: OptionsType = {},
        ColumnClass = MasonryColumn,
    ) {
        if (!Array.isArray(items)) {
            throw new Error('Items must be an array');
        }

        if (columns <= 0 || width <= 0) {
            throw new Error('Columns or width must be greater than zero');
        }

        if (columns > width) {
            throw new Error('Columns must be smallest or equal than width');
        }

        const space = options.space ?? 0;
        const colWidth = MasonryGrid.getColumnWidth(columns, width, space);

        this.columns = Array.from(
            { length: columns },
            (_c, index) => new ColumnClass(index * (colWidth + space), colWidth, options),
        );

        for (const item of items) {
            this.shortest.insert(item);
        }
    }

    static getColumnWidth = (columns: number, width: number, space: number) =>
        (width + space) / columns - space;

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
