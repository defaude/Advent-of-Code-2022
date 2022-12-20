const LOWER_CASE_A = 'a'.charCodeAt(0);
const START = 'S';
const END = 'E';

type Point = { elevation: number; start: boolean; end: boolean };
type Line = Point[];
type Field = Line[];

const elevationForChar = (char: string) => {
    return char.charCodeAt(0) - LOWER_CASE_A;
};

const toPoint = (char: string): Point => {
    switch (char) {
        case START:
            return { elevation: elevationForChar('a'), start: true, end: false };
        case END:
            return { elevation: elevationForChar('z'), start: false, end: true };
        default:
            return { elevation: elevationForChar(char), start: false, end: false };
    }
};

const toLine = (line: string): Line => line.split('').map(toPoint);
const parse = (lines: string[]): Field => lines.map(toLine);

type Coordinate = { x: number; y: number };

const getCoords = (field: Field, predicate: (c: Point) => boolean): Coordinate => {
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[0].length; x++) {
            if (predicate(field[y][x])) {
                return { x, y };
            }
        }
    }
};

type Node = Point &
    Coordinate & {
        // previous node in the path
        parent?: Node;
        // distance to start (i.e. "cost")
        distance: number;
        // heuristic distance to target
        heuristic: number;
    };

const getRawNode = (field: Field, { x, y }: Coordinate): Node | undefined => {
    const point = field[y]?.[x];
    if (point) {
        return { ...point, x, y, distance: 0, heuristic: 0 };
    }
};

const fullCost = ({ distance, heuristic }: Node): number => distance + heuristic;

const estimateDistance = ({ x: x1, y: y1 }: Coordinate, { x: x2, y: y2 }: Coordinate): number =>
    Math.abs(x1 - x2) + Math.abs(y1 - y2);

const takeCheapestNode = (nodes: Map<string, Node>): Node => {
    let currentCost = Infinity;
    let currentKey = '';

    for (const [key, node] of nodes) {
        const nodeCost = fullCost(node);
        if (nodeCost < currentCost) {
            currentCost = nodeCost;
            currentKey = key;
        }
    }

    const node = nodes.get(currentKey);
    nodes.delete(currentKey);
    return node;
};

const getPath = (node: Node): Node[] => {
    const result = [];

    do {
        result.push(node);
        node = node.parent;
    } while (node);

    return result.reverse();
};

const getCKey = ({ x, y }: Coordinate) => `${x}/${y}`;

const aStar = (
    field: Field,
    startCoords: Coordinate,
    endCoords: Coordinate,
    viableChildren: (node: Node, field: Field) => Node[]
): Node[] => {
    const toInspect: Map<string, Node> = new Map();
    const startNode = getRawNode(field, startCoords);

    toInspect.set(getCKey(startNode), startNode);

    const visited = new Set<string>();

    while (toInspect.size > 0) {
        const currentNode = takeCheapestNode(toInspect);
        visited.add(getCKey(currentNode));

        if (currentNode.end) {
            return getPath(currentNode).slice(1);
        }

        for (const child of viableChildren(currentNode, field)) {
            const childKey = getCKey(child);

            if (visited.has(childKey)) {
                continue;
            }

            const distance = currentNode.distance + 1;
            const heuristic = estimateDistance(child, endCoords);

            if (toInspect.has(childKey)) {
                const other = toInspect.get(childKey);
                if (other.distance < distance) {
                    continue;
                }
            }

            toInspect.set(childKey, { ...child, parent: currentNode, distance, heuristic });
        }
    }

    throw new Error('Could not find a path to the target!');
};

const getRawNeighbours = (field: Field, { x, y }: Coordinate): Node[] => {
    const up = { x, y: y - 1 };
    const right = { x: x + 1, y };
    const down = { x, y: y + 1 };
    const left = { x: x - 1, y };

    return [up, right, down, left].map((c) => getRawNode(field, c)).filter((n) => !!n);
};

const viableChildrenWithoutClimbingGear = (currentNode: Node, field: Field): Node[] =>
    getRawNeighbours(field, currentNode).filter((node) => node.elevation <= currentNode.elevation + 1);

const aStarWithoutClimbingGear = (field: Field, startCoords: Coordinate, endCoords: Coordinate) =>
    aStar(field, startCoords, endCoords, viableChildrenWithoutClimbingGear);

export const getMinimumStepsToBestSignal = (lines: string[]) => {
    const field = parse(lines);
    const startCoords = getCoords(field, (x) => x.start);
    const endCoords = getCoords(field, (x) => x.end);

    const path = aStarWithoutClimbingGear(field, startCoords, endCoords);

    return path.length;
};

const getPotentialStarts = (field: Field): Coordinate[] => {
    const result = [];

    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[0].length; x++) {
            if (field[y][x].elevation === 0) {
                result.push({ x, y });
            }
        }
    }

    return result;
};

export const getShortestHike = (lines: string[]) => {
    const field = parse(lines);
    const endCoords = getCoords(field, (x) => x.end);

    const potentialStarts = getPotentialStarts(field);

    const paths = potentialStarts
        .map((startCoords) => {
            try {
                return aStarWithoutClimbingGear(field, startCoords, endCoords);
            } catch (e) {
                // console.info('no path found for', startCoords);
            }
        })
        .filter((path) => !!path)
        .map((path) => path.length);

    return Math.min(...paths);
};
