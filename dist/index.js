import { MasonryGrid } from './MasonryGrid/MasonryGrid';
export function getMasonryLayout(items, width, columns, options = {}) {
    var _a;
    const grid = new MasonryGrid(items, width, columns, options);
    return {
        items: grid.items,
        height: (_a = grid.longest.height) !== null && _a !== void 0 ? _a : 0,
    };
}
//# sourceMappingURL=index.js.map