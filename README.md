# Masonry Grid layout

A TypeScript implementation of a masonry grid layout.

## Features

- Automatically arranges items in a masonry grid layout
- Typescript support with generic item data

## Installation

```bash
npm i @agat/masonry-layout
```

## Usage

```ts
import { type ItemType, getMasonryLayout } from '@agat/masonry-layout';

type MyItemType = {
    title: string;
    imageUrl: string;
};

const items: ItemType<MyItemType>[] = [
    { size: { width: 200, height: 200 }, data: { ... } },
    { size: { width: 100, height: 300 }, data: { ... } },
];

const layout = getMasonryLayout(items, 640, 2, { space: 10 });
```

The `layout` object contains the arranged `items` and the total `height` of the grid:

```json
{
    "items": [
        {
            "data": { ... },
            "rect": {
                "x": 0,
                "y": 0,
                "width": 315,
                "height": 315
            }
        },
        {
            "data": { ... },
            "rect": {
                "x": 325,
                "y": 0,
                "width": 315,
                "height": 945
            }
        }
    ],
    "height": 945
}
```

## API

### getMasonryLayout

Creates a masonry grid layout and returns the layout with `items` and total `height`.

```ts
function getMasonryLayout<T>(
    items: ItemType<T>[],
    width: number,
    columns: number,
    options: OptionsType = {},
): LayoutType<T>
```
#### items

Items array with `size` and `data` fields:

```ts
[
    {
        size: {
            width: 200, // is optional
            height: 200
        },
        data: { ... }
    }
]
```

If a `width` is provided, a `height` value may be changed in the generated layout to save the aspect ratio value.

#### width

Available layout width. Positive number value.

#### columns

Columns count. Positive number value.

#### options

```ts
type OptionsType = {
    space?: number; // grid items spacing 
};
```
