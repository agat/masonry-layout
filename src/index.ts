import { MasonryGrid } from './MasonryGrid/MasonryGrid';
import type { ItemType, LayoutType, OptionsType } from './types';

export function getMasonryLayout<T>(
    items: ItemType<T>[],
    width: number,
    columns: number,
    options: OptionsType = {},
): LayoutType<T> {
    const grid = new MasonryGrid(items, width, columns, options);

    return {
        items: grid.items,
        height: grid.longest.height ?? 0,
    } as const;
}
