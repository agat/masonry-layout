import type { GridItemType, ItemType, OptionsType, RectType } from '../types';
export declare class MasonryColumn<T> {
    readonly x: number;
    readonly width: number;
    readonly options: Readonly<OptionsType>;
    protected innerItems: GridItemType<T>[];
    protected innerHeight: number;
    constructor(x: number, width: number, options: OptionsType);
    get bottom(): number;
    get height(): number;
    get items(): readonly GridItemType<T>[];
    getNewItemRect(item: ItemType<T>): RectType;
    insert(item: ItemType<T>): void;
}
