import zip from 'lodash/zip';
import cloneDeep from 'lodash/cloneDeep';

const crateRegex = / ?( {3})|\[([A-Z])]/g;

export const parseCrates = (line: string) => {
    const result = [];

    for (const match of line.matchAll(crateRegex)) {
        const crate = match[2];
        result.push(crate);
    }

    return result;
};

const moveRegex = /^move (\d+) from (\d+) to (\d+)$/;

type Move = { amount: number; from: number; to: number };

export const parseMoves = (line: string): Move => {
    const [_, amount, from, to] = line.match(moveRegex);
    return {
        amount: parseInt(amount, 10),
        from: parseInt(from, 10),
        to: parseInt(to, 10),
    };
};

export const applyMoves = (stacks: string[][], moves: Move[], bulk = false) => {
    const newStacks = cloneDeep(stacks);

    for (const { amount, from, to } of moves) {
        let items = newStacks[from - 1].splice(0, amount);
        if (!bulk) {
            items = items.reverse();
        }
        newStacks[to - 1].splice(0, 0, ...items);
    }

    return newStacks;
};

export const sortCratesHanoiStyle = (lines: string[]) => {
    const emptyLineIndex = lines.indexOf('');

    const crates = lines.slice(0, emptyLineIndex - 1).map(parseCrates);
    const stacks = zip(...crates).map((stack) =>
        stack.filter((item) => !!item)
    );

    const moves = lines.slice(emptyLineIndex + 1).map(parseMoves);

    const newStacks = applyMoves(stacks, moves);

    return newStacks.map((stack) => stack[0]).join('');
};

export const sortCrates9001 = (lines: string[]) => {
    const emptyLineIndex = lines.indexOf('');

    const crates = lines.slice(0, emptyLineIndex - 1).map(parseCrates);
    const stacks = zip(...crates).map((stack) =>
        stack.filter((item) => !!item)
    );

    const moves = lines.slice(emptyLineIndex + 1).map(parseMoves);

    const newStacks = applyMoves(stacks, moves, true);

    return newStacks.map((stack) => stack[0]).join('');
};
