type Row = number[];
type Tree = { row: number; column: number };

const getRows = (lines: string[]) => lines.map((line) => line.split('').map((tree) => parseInt(tree, 10)));

const applyToInnerTrees = (rows: Row[], fn: (tree: Tree) => unknown) => {
    const rowCount = rows.length - 1;
    const columnCount = rows[0].length - 1;

    for (let row = 1; row < rowCount; row++) {
        for (let column = 1; column < columnCount; column++) {
            fn({ row, column });
        }
    }
};

const getNeighbours = ({ row, column }: Tree, rows: Row[]) => {
    const currentRow = rows[row];
    const currentColumn = rows.map((r) => r[column]);

    const north = currentColumn.slice(0, row).reverse();
    const east = currentRow.slice(column + 1);
    const south = currentColumn.slice(row + 1);
    const west = currentRow.slice(0, column).reverse();

    return { north, east, south, west };
};

const isLowerThan = (height: number) => (x) => x < height;

const visibleFromSides = ({ row, column }: Tree, rows: Row[]) => {
    const currentTreeHeight = rows[row][column];
    const isLowerThanThree = isLowerThan(currentTreeHeight);

    const { north, east, south, west } = getNeighbours({ row, column }, rows);

    return [
        north.every(isLowerThanThree),
        east.every(isLowerThanThree),
        south.every(isLowerThanThree),
        west.every(isLowerThanThree),
    ].filter((x) => x).length;
};

const getVisibleInnerTrees = (rows: Row[]) => {
    let visibleTrees = 0;

    applyToInnerTrees(rows, ({ row, column }) => {
        if (visibleFromSides({ row, column }, rows) > 0) {
            visibleTrees++;
        }
    });

    return visibleTrees;
};

export const countVisibleTrees = (lines: string[]) => {
    const rows = getRows(lines);

    const boundingTrees = 2 * rows.length + 2 * rows[0].length - 4;
    const visibleInnerTrees = getVisibleInnerTrees(rows);

    return boundingTrees + visibleInnerTrees;
};

const getScore = ({ row, column }: Tree, rows: Row[]) => {
    const currentHeight = rows[row][column];
    const { north, east, south, west } = getNeighbours({ row, column }, rows);

    const [n, e, s, w] = [north, east, south, west].map((neighbours) => {
        const index = neighbours.findIndex((n) => n >= currentHeight);
        return index === -1 ? neighbours.length : index + 1;
    });

    return n * e * s * w;
};

const getScenicScores = (rows: Row[]) => {
    const scores: number[] = [];

    applyToInnerTrees(rows, (tree) => {
        scores.push(getScore(tree, rows));
    });

    return scores;
};

export const getMaxScenicScore = (lines: string[]) => {
    const rows = getRows(lines);

    const scenicScores = getScenicScores(rows);

    return Math.max(...scenicScores);
};
