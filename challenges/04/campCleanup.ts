const rgx = /(\d+)-(\d+),(\d+)-(\d+)/;

type Range = { from: number; to: number };
type RangePair = [Range, Range];

const toPair = (line: string): RangePair => {
    const [_, from1, to1, from2, to2] = line.match(rgx).map((x) => parseInt(x, 10));
    return [
        { from: from1, to: to1 },
        { from: from2, to: to2 },
    ];
};

const isEnclosed = (one: Range, two: Range) => {
    return one.from <= two.from && one.to >= two.to;
};

const isEnclosedPair = ([one, two]: RangePair) => {
    return isEnclosed(one, two) || isEnclosed(two, one);
};

export const countEnclosedPairs = (lines: string[]) => {
    const pairs = lines.map(toPair);
    return pairs.filter(isEnclosedPair).length;
};

const isOverlapping = (one: Range, two: Range) => {
    return one.to >= two.from;
};

export const isOverlappingPair = ([one, two]: RangePair) => {
    return isOverlapping(one, two) && isOverlapping(two, one);
};

export const countOverlappingPairs = (lines: string[]) => {
    const pairs = lines.map(toPair);
    return pairs.filter(isOverlappingPair).length;
};
