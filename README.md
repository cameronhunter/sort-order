# sort-order
[![Build Status](https://travis-ci.org/cameronhunter/sort-order.svg?branch=master)](https://travis-ci.org/cameronhunter/sort-order) [![NPM Version](https://img.shields.io/npm/v/sort-order.svg)](https://npmjs.org/package/sort-order) [![License](https://img.shields.io/npm/l/sort-order.svg)](https://github.com/cameronhunter/sort-order/blob/master/LICENSE.md)

Combine a series of sort functions to create complex sort orders.

## Install
```bash
npm install --save sort-order
```

## Example
Sort an array of objects by `creator` first, then `joinTime` and finally `id`:

```javascript
import sortBy from 'sort-order';

// Items to order
const a = { creator: true, joinTime: 0, id: 987 };
const b = { creator: false, joinTime: 1, id: 123 };
const c = { creator: false, joinTime: 1, id: 456 };
const d = { creator: false, joinTime: 2, id: 789 };

// Individual sort functions
const creator = (a, b) => ((a.creator && -1) || (b.creator && 1) || 0);
const field = (field) => (a, b) => (a[field] - b[field]);

// Combined sort function
const ordering = sortBy(creator, field('joinTime'), field('id'));

// Sort!
[d, c, b, a].sort(ordering); // [a, b, c, d]
```
