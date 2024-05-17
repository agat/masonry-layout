import { beforeEach, describe, expect, it } from '@jest/globals';
import { options } from '../../tests/constants';

import { MasonryColumn } from './MasonryColumn';

describe(MasonryColumn, () => {
    const item = { data: null, size: { width: 100, height: 50 } };
    let masonryColumn: MasonryColumn<unknown>;

    beforeEach(() => {
        masonryColumn = new MasonryColumn(0, 100, options);
    });

    it('should initialize with correct properties', () => {
        const masonryColumn = new MasonryColumn(0, 100, options);

        expect(masonryColumn.x).toBe(0);
        expect(masonryColumn.width).toBe(100);
        expect(masonryColumn.options).toEqual(Object.freeze(options));
        expect(masonryColumn.height).toBe(0);
        expect(masonryColumn.bottom).toBe(0);
        expect(masonryColumn.items).toEqual([]);
    });

    it('should throw an error if x is less than 0', () => {
        expect(() => new MasonryColumn(-1, 100, options)).toThrow();
    });

    it('should throw an error if width is less than or equal to 0', () => {
        expect(() => new MasonryColumn(0, 0, options)).toThrow();
    });

    it('should calculate the correct bottom position', () => {
        masonryColumn.insert(item);

        expect(masonryColumn.bottom).toBe(60); // 50 + space (10)
    });

    it('should return the correct item rectangle', () => {
        const rect = masonryColumn.getNewItemRect(item);

        expect(rect).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 50,
        });
    });

    it('should adjust the height if the item width is different from column width', () => {
        const rect = masonryColumn.getNewItemRect({ ...item, size: { width: 50, height: 50 } });

        expect(rect).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 100, // height adjusted proportionally
        });
    });

    it('should insert an item and update innerHeight correctly', () => {
        masonryColumn.insert(item);

        expect(masonryColumn.items.length).toBe(1);
        expect(masonryColumn.height).toBe(50);
        expect(masonryColumn.items[0].rect).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 50,
        });
    });

    it('should insert multiple items and update innerHeight correctly', () => {
        const item1 = { ...item, size: { width: 100, height: 50 } };
        const item2 = { ...item, size: { width: 100, height: 100 } };

        masonryColumn.insert(item1);
        masonryColumn.insert(item2);

        expect(masonryColumn.items.length).toBe(2);
        expect(masonryColumn.height).toBe(160); // 50 + 10 (space) + 100
        expect(masonryColumn.bottom).toBe(170); // 50 + 10 (space) + 100 + 10 (space)
    });
});
