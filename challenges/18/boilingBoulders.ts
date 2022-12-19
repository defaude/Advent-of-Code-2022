import { sumUp } from '../../utility/sumUp';

const neighbours = (line: string) => {
    const [x, y, z] = line.split(',').map((c) => parseInt(c, 10));

    return [
        [x - 1, y, z],
        [x + 1, y, z],
        [x, y - 1, z],
        [x, y + 1, z],
        [x, y, z - 1],
        [x, y, z + 1],
    ].map((coords) => coords.join(','));
};

export const surfaceArea = (lines: string[]) => {
    const droplet: Map<string, number> = new Map();

    for (const line of lines) {
        let exposedSides = 6;
        for (const cube of neighbours(line)) {
            if (droplet.has(cube)) {
                exposedSides--;
                droplet.set(cube, droplet.get(cube) - 1);
            }
        }
        droplet.set(line, exposedSides);
    }

    return sumUp(Array.from(droplet.values()));
};

export const exteriorSurfaceArea = (lines: string[]) => {
    return 0;
};
