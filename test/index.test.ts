import { test, expect } from 'vitest';
import sortOrder, { type Comparator } from '../src';

type Item = { creator: boolean; joinTime: number; id: number };

const a: Item = { creator: true, joinTime: 0, id: 987 };
const b: Item = { creator: false, joinTime: 1, id: 123 };
const c: Item = { creator: false, joinTime: 1, id: 456 };
const d: Item = { creator: false, joinTime: 2, id: 789 };

const creator: Comparator<Item> = (a, b) => (a.creator && -1) || (b.creator && 1) || 0;

function field(name: 'joinTime' | 'id') {
    return (a: Item, b: Item) => a[name] - b[name];
}

const ordering = sortOrder(creator, field('joinTime'), field('id'));

test('Sorts items with the creator first, then ordered by joinTime, and finally by ID', () => {
    expect([a, b, c, d].sort(ordering)).toEqual([a, b, c, d]);
    expect([d, c, b, a].sort(ordering)).toEqual([a, b, c, d]);
    expect([b, a, c, d].sort(ordering)).toEqual([a, b, c, d]);
});
