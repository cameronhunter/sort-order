import test from 'ava';
import sortOrder from '../src';

const a = { creator: true, joinTime: 0, id: 987 };
const b = { creator: false, joinTime: 1, id: 123 };
const c = { creator: false, joinTime: 1, id: 456 };
const d = { creator: false, joinTime: 2, id: 789 };

const creator = (a, b) => ((a.creator && -1) || (b.creator && 1) || 0);
const field = (field) => (a, b) => (a[field] - b[field]);

const ordering = sortOrder(creator, field('joinTime'), field('id'));

test(t => {
  t.same([a, b, c, d].sort(ordering), [a, b, c, d]);
});

test(t => {
  t.same([d, c, b, a].sort(ordering), [a, b, c, d]);
});

test(t => {
  t.same([b, a, c, d].sort(ordering), [a, b, c, d]);
});
