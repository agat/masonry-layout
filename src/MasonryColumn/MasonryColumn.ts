import type { GridItemType, ItemType, OptionsType, RectType } from '../types';

export class MasonryColumn<T> {
    readonly x;
    readonly width;
    readonly options;
    protected innerItems: GridItemType<T>[] = [];
    protected innerHeight = 0;

    constructor(x: number, width: number, options: OptionsType) {
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
        if (this.height === 0) {
            return 0;
        }

        return this.height + (this.options?.space ?? 0);
    }

    get height() {
        return this.innerHeight;
    }

    get items(): readonly GridItemType<T>[] {
        return this.innerItems;
    }

    getNewItemRect(item: ItemType<T>) {
        const rect: RectType = {
            x: this.x,
            y: this.bottom,
            width: item.size.width ?? this.width,
            height: item.size.height,
        };

        if (item.size.width !== this.width) {
            // Resize
            rect.height *= this.width / rect.width;
            rect.width = this.width;
        }

        return rect;
    }

    insert(item: ItemType<T>) {
        const rect = this.getNewItemRect(item);

        this.innerItems.push({ data: item.data, rect });
        this.innerHeight = rect.y + rect.height;
    }
}
