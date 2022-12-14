import range from 'lodash/range';
import sortBy from 'lodash/sortBy';

const AIR = '.';
const SAND = 'o';
const ROCK = '#';
const START = '+';
const FALLING_SAND = '~';

type Spot = typeof AIR | typeof SAND | typeof ROCK | typeof START | typeof FALLING_SAND;
type Line = Spot[];
type Cave = {
    lines: Line[];
    minX: number;
    maxX: number;
    depth: number;
};

const START_X = 500;
const START_Y = 0;

const getDigit = (digit: number, mod = digit * 10) => {
    return (x: number) => Math.floor((x % mod) / digit);
};
const get100 = getDigit(100);
const get10 = getDigit(10);
const get1 = getDigit(1);

const getSpot = (x: number, y: number, lines: Line[]): Spot => {
    return lines[x]?.[y] ?? AIR;
};

const printCave = ({ lines, minX, maxX, depth }: Cave) => {
    const xMarkers = range(minX - 1, maxX + 2, 4);
    const allX = range(minX - 1, maxX + 2);

    for (const fn of [get100, get10, get1]) {
        const markers = allX.map((x) => (xMarkers.includes(x) ? fn(x) : ' ')).join('');
        console.log(`        ${markers}`);
    }

    for (let y = 0; y <= depth; y++) {
        const lineStart = `${y}`.padStart(4);
        const caveXLine = allX.map((x) => getSpot(x, y, lines)).join('');
        console.log(`${lineStart} -> ${caveXLine}`);
    }
};

type NT = [number, number];

const put = (lines: Line[], x: number, y: number, spot: Spot = AIR) => {
    (lines[x] = lines[x] || [])[y] = spot;
};

const fromTo = (from: number, to: number): number[] => {
    const result = [];
    const [l, r] = sortBy([from, to]);
    for (let v = l; v <= r; v++) {
        result.push(v);
    }
    return result;
};

const drawLine = ([x1, y1]: NT, [x2, y2]: NT, lines: Line[]) => {
    if (x1 === x2) {
        for (const y of fromTo(y1, y2)) {
            put(lines, x1, y, ROCK);
        }
    } else {
        for (const x of fromTo(x1, x2)) {
            put(lines, x, y1, ROCK);
        }
    }
};

const getCave = (input: string[]): Cave => {
    const lines: Line[] = [];
    lines[START_X] = [START];

    let minX = START_X;
    let maxX = START_X;
    let depth = 0;

    for (const line of input) {
        const strings = line.split(' -> ');
        const points: NT[] = strings.map((string) => {
            const [x, y] = string.split(',').map((a) => parseInt(a, 10));
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            depth = Math.max(depth, y);
            return [x, y];
        });

        for (let p = 0; p < points.length - 1; p++) {
            drawLine(points[p], points[p + 1], lines);
        }
    }

    return { lines, minX, maxX, depth };
};

const isAir = (x: number, y: number, lines: Line[]) => getSpot(x, y, lines) === AIR;

const addSand = ({ lines, depth }: Cave) => {
    let x = START_X;
    let y = START_Y;

    if (getSpot(x, y, lines) === SAND) {
        return false;
    }

    do {
        const canGoBelow = isAir(x, y + 1, lines);
        const canGoLeft = isAir(x - 1, y + 1, lines);
        const canGoRight = isAir(x + 1, y + 1, lines);

        if (canGoBelow) {
            // I'm still falling
        } else if (canGoLeft) {
            x--;
        } else if (canGoRight) {
            x++;
        } else {
            // once we get here, the sand can rest here
            put(lines, x, y, SAND);
            return true;
        }

        y++;
    } while (y < depth);
};

export const countRestingSands = (lines: string[]) => {
    const cave = getCave(lines);
    let sandsDropped = 0;

    // console.log('START');
    // printCave(cave);

    while (addSand(cave)) {
        sandsDropped++;
    }

    // console.log('\n\nEND');
    // printCave(cave);

    return sandsDropped;
};

export const countAllTheSands = (lines: string[]) => {
    let cave = getCave(lines);

    const minX = 0;
    const maxX = cave.maxX + 5e3;
    const depth = cave.depth + 2;

    // add floor
    drawLine([minX, depth], [maxX, depth], cave.lines);

    cave = { ...cave, minX, maxX, depth };
    let sandsDropped = 0;

    while (addSand(cave)) {
        sandsDropped++;
    }

    // printCave(cave);

    return sandsDropped;
};
