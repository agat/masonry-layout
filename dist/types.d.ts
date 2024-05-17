export type RectType = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type ItemType<T> = {
    size: SizeType;
    data: T;
};
export type GridItemType<T> = {
    rect: RectType;
    data: T;
};
export type LayoutType<T> = {
    items: GridItemType<T>[];
    height: number;
};
export type SizeType = {
    width?: number;
    height: number;
};
export type OptionsType = {
    space?: number;
};
