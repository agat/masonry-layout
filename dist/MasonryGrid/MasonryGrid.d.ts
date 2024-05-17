import { MasonryColumn } from '../MasonryColumn/MasonryColumn';
import type { ItemType, OptionsType } from '../types';
export declare class MasonryGrid<T> {
    readonly columns: MasonryColumn<T>[];
    constructor(items: ItemType<T>[], width: number, columns: number, options?: OptionsType, ColumnClass?: typeof MasonryColumn);
    static getColumnWidth: (columns: number, width: number, space: number) => number;
    getShortestColumns(): MasonryColumn<T>[];
    get shortest(): MasonryColumn<T>;
    get longest(): MasonryColumn<T>;
    get items(): import("../types").GridItemType<T>[];
}
