import { beforeEach, describe, expect, it } from '@jest/globals';

import { columns, items as masonryGridItems, options, width } from '../../tests/constants';
import { MasonryColumn } from '../MasonryColumn/MasonryColumn';
import type { ItemType } from '../types';
import { MasonryGrid } from './MasonryGrid';

describe('MasonryGrid', () => {
    let items: ItemType<unknown>[];
    let masonryGrid: MasonryGrid<unknown>;

    beforeEach(() => {
        items = [...masonryGridItems];

        masonryGrid = new MasonryGrid(items, width, columns, options);
    });

    it('should throw an error for bad arguments', () => {
        // @ts-ignore
        expect(() => MasonryGrid()).toThrow();
        // @ts-ignore
        expect(() => MasonryGrid(1)).toThrow();
        // @ts-ignore
        expect(() => MasonryGrid({})).toThrow();
        // @ts-ignore
        expect(() => MasonryGrid([])).toThrow();
        // @ts-ignore
        expect(() => MasonryGrid([], 100)).toThrow();
        // @ts-ignore
        expect(() => MasonryGrid([], 100, 0)).toThrow();
        // @ts-ignore
        expect(() => MasonryGrid([], -100)).toThrow();
        // @ts-ignore
        expect(() => MasonryGrid([], 100, -3)).toThrow();
        // @ts-ignore
        expect(() => MasonryGrid([], '')).toThrow();
        // @ts-ignore
        expect(() => MasonryGrid([], 100, {})).toThrow();
        // @ts-ignore
        expect(() => MasonryGrid([], 3, 3)).toThrow();
    });

    it('should initialize with correct properties', () => {
        expect(masonryGrid.columns.length).toBe(3);
        expect(masonryGrid.columns[0] instanceof MasonryColumn).toBe(true);
    });

    it('should throw an error if columns is greater than width', () => {
        expect(() => new MasonryGrid(items, 2, columns, options)).toThrow();
    });

    it('should distribute items to the shortest column', () => {
        expect(masonryGrid.shortest.items.length).toBe(1);
    });

    it('should return the correct column width', () => {
        const colWidth = MasonryGrid.getColumnWidth(columns, 300, 10);

        expect(colWidth).toBeCloseTo(93.33, 2);
    });

    it('should get the shortest column', () => {
        expect(masonryGrid.shortest.height).toBe(25);
    });

    it('should get the longest column', () => {
        expect(masonryGrid.longest.height).toBe(100);
    });

    it('should return all items sorted by y position', () => {
        const sortedItems = masonryGrid.items;

        expect(sortedItems[0].data).toBe('item1');
        expect(sortedItems[1].data).toBe('item2');
        expect(sortedItems[2].data).toBe('item3');
    });

    it('should generate correctly masonry layout', () => {
        masonryGrid = new MasonryGrid(
            [...items, { data: 'item4', size: { width: 100, height: 25 } }],
            320,
            3,
            options,
        );

        expect(masonryGrid.items[0].rect).toEqual({
            x: 0,
            y: 0,
            width: 100,
            height: 50,
        });

        expect(masonryGrid.items[1].rect).toEqual({
            x: 100 + options.space,
            y: 0,
            width: 100,
            height: 100,
        });

        expect(masonryGrid.items[2].rect).toEqual({
            x: 100 + options.space + 100 + options.space,
            y: 0,
            width: 100,
            height: 25,
        });

        expect(masonryGrid.items[3].rect).toEqual({
            x: 220,
            y: 25 + options.space,
            width: 100,
            height: 25,
        });
    });
});
