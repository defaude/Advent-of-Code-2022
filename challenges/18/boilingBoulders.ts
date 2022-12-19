import { sumUp } from '../../utility/sumUp';

const separator = ',';

type Coordinate = [number, number, number];

const toCoords = (line: string) => line.split(separator).map((c) => parseInt(c, 10)) as Coordinate;

const toLine = ([x, y, z]: Coordinate) => `${x},${y},${z}`;

const neighbours = (x: number, y: number, z: number) => {
    return [
        [x - 1, y, z],
        [x + 1, y, z],
        [x, y - 1, z],
        [x, y + 1, z],
        [x, y, z - 1],
        [x, y, z + 1],
    ].map(toLine);
};

const getCubes = (coords: Coordinate[]) => {
    const cubes: Map<string, number> = new Map();

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;

    for (const [x, y, z] of coords) {
        minX = Math.min(x, minX);
        maxX = Math.max(x, maxX);
        minY = Math.min(y, minY);
        maxY = Math.max(y, maxY);
        minZ = Math.min(z, minZ);
        maxZ = Math.max(z, maxZ);

        let exposedSides = 6;
        for (const cube of neighbours(x, y, z)) {
            if (cubes.has(cube)) {
                exposedSides--;
                cubes.set(cube, cubes.get(cube) - 1);
            }
        }
        cubes.set(toLine([x, y, z]), exposedSides);
    }
    return { cubes, minX, maxX, minY, maxY, minZ, maxZ };
};

export const surfaceArea = (lines: string[]) => {
    const { cubes } = getCubes(lines.map(toCoords));
    return sumUp(Array.from(cubes.values()));
};

export const exteriorSurfaceArea = (lines: string[]) => {
    const { cubes, minX, maxX, minY, maxY, minZ, maxZ } = getCubes(lines.map(toCoords));

    cubes.forEach((exposedSides: number, coord: string) => {
        if (exposedSides === 0) {
            console.info(`unexposed cube ${coord}`);
        }
    });

    return 0;
};
