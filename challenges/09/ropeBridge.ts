import { assertNever } from '../../utility/assertNever';

const moveRegex = /^([LRUD]) (\d+)$/;

type Direction = 'U' | 'R' | 'D' | 'L';
type Move = { direction: Direction; amount: number };
type Position = { x: number; y: number };
type RopeState = {
    head: Position;
    tail: Position;
    tailBuffer: Position[];
};

type KnotsState = {
    knots: Position[];
    tailBuffer: Position[];
};

const lineToMove = (line: string): Move => {
    const [_, direction, amount] = line.match(moveRegex);
    return {
        direction: direction as Direction,
        amount: parseInt(amount, 10),
    };
};

const updatePosition = ({ x, y }: Position, direction: Direction): Position => {
    switch (direction) {
        case 'U':
            return { x, y: y + 1 };
        case 'R':
            return { x: x + 1, y };
        case 'D':
            return { x, y: y - 1 };
        case 'L':
            return { x: x - 1, y };
        default:
            assertNever(direction);
    }
};

const distance = (head: Position, tail: Position) => {
    return Math.max(Math.abs(head.x - tail.x), Math.abs(head.y - tail.y));
};

const follow = (tail: Position, { x, y }: Position) => {
    return {
        x: tail.x + Math.sign(x - tail.x),
        y: tail.y + Math.sign(y - tail.y),
    };
};

const applyStep = (state: RopeState, direction: Direction): RopeState => {
    let { head, tail, tailBuffer } = state;

    head = updatePosition(head, direction);

    if (distance(head, tail) > 1) {
        tail = follow(tail, head);
        tailBuffer.push(tail);
    }

    return { head, tail, tailBuffer };
};

const applyMove = (state: RopeState, { direction, amount }: Move): RopeState => {
    let nextState = state;

    for (let i = 0; i < amount; i++) {
        nextState = applyStep(nextState, direction);
    }

    return nextState;
};

const applyMoves = (state: RopeState, moves: Move[]): RopeState => {
    let nextState = state;

    for (const move of moves) {
        nextState = applyMove(nextState, move);
    }

    return nextState;
};

const doCountTailPositions = (moves: Move[]) => {
    const initialState = {
        head: { x: 0, y: 0 },
        tail: { x: 0, y: 0 },
        tailBuffer: [{ x: 0, y: 0 }],
    };

    const { tailBuffer } = applyMoves(initialState, moves);

    const asSet = new Set(tailBuffer.map(({ x, y }) => `${x} ${y}`));
    return asSet.size;
};

export const countTailPositions = (lines: string[]) => {
    const moves = lines.map(lineToMove);

    return doCountTailPositions(moves);
};

const updateKnotStateForStep = (state: KnotsState, direction: Direction) => {
    state.knots[0] = updatePosition(state.knots[0], direction);
    for (let i = 1; i < state.knots.length; i++) {
        let current = state.knots[i];
        let previous = state.knots[i - 1];
        if (distance(previous, current) > 1) {
            current = follow(current, previous);
        }
        state.knots[i] = current;
    }
    state.tailBuffer.push(state.knots[state.knots.length - 1]);
};

const updateKnotStateForMove = (state: KnotsState, { direction, amount }: Move) => {
    for (let i = 0; i < amount; i++) {
        updateKnotStateForStep(state, direction);
    }
};

export const countMultiKnotTailPositions = (lines: string[]) => {
    const state: KnotsState = {
        knots: [],
        tailBuffer: [{ x: 0, y: 0 }],
    };

    for (let i = 0; i < 10; i++) {
        state.knots.push({ x: 0, y: 0 });
    }

    const moves = lines.map(lineToMove);

    for (const move of moves) {
        updateKnotStateForMove(state, move);
    }

    const asSet = new Set(state.tailBuffer.map(({ x, y }) => `${x} ${y}`));
    return asSet.size;
};
