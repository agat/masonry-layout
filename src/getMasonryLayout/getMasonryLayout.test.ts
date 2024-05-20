import { describe, expect, it } from 'vitest';
import { columns, items, options, width } from '../tests/constants';

import { getMasonryLayout } from '../index';

describe(getMasonryLayout, () => {
    it('should return layout with items and height', () => {
        const layout = getMasonryLayout(items, width, columns, options);

        expect(layout.items.length).toBe(3);
        expect(layout.height).toBeGreaterThan(0);
    });

    it('should return layout with empty items array and height 0 for empty items input', () => {
        const layout = getMasonryLayout([], width, columns, options);

        expect(layout.items.length).toBe(0);
        expect(layout.height).toBe(0);
    });

    it('should correctly use default options if none are provided', () => {
        const layout = getMasonryLayout(
            [
                { data: null, size: { height: 50 } },
                { data: null, size: { height: 100 } },
                { data: null, size: { height: 25 } },
                { data: null, size: { height: 125 } },
            ],
            300,
            3,
        );

        expect(layout.items.length).toBe(4);
        expect(layout.height).toBe(150);
    });
});
