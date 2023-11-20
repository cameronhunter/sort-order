type Comparison = number | undefined;

export type Comparator<T> = (a: T, b: T) => Comparison;

function collectFirst<T>(
    [head, ...tail]: Array<Comparator<T>>,
    fn: (compare: Comparator<T>) => Comparison,
): Comparison | undefined {
    const result = head && fn(head);
    return result === undefined && tail.length ? collectFirst(tail, fn) : result;
}

function nonZero<T>(a: T, b: T) {
    return function (compare: Comparator<T>) {
        const result = compare(a, b);
        return result === 0 ? undefined : result;
    };
}

export default function sortOrder<T>(...fns: Array<Comparator<T>>) {
    return function comparator(a: T, b: T) {
        return collectFirst(fns, nonZero(a, b)) || 0;
    };
}
