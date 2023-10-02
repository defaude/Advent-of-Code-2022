import { sumUp } from '../../utility/sumUp';
import { max, update } from 'lodash';

export type RawFile = {
    path: string;
    size: number;
};

export type RawDir = {
    path: string;
};

export type RawNode = RawFile | RawDir;

const isFileNode = (node: RawNode): node is RawFile => 'size' in node;
const isDirNode = (node: RawNode): node is RawDir => !isFileNode(node);

const cdRegex = /^\$ cd (.+)$/;
const ls = '$ ls';
const dirRegex = /^dir (.+)$/;
const fileRegex = /^(\d+) (.+)$/;
const parentDir = '..';

const isCdLine = (line: string) => line.startsWith('$ cd ');
const isFileLine = (line: string) => fileRegex.test(line);

export const getNodes = (lines: string[]): RawNode[] => {
    const nodes: RawNode[] = [];

    let context = [];

    for (const line of lines) {
        if (isCdLine(line)) {
            const basename = line.match(cdRegex)[1];
            if (basename === parentDir) {
                context.pop();
            } else {
                context.push(basename);
                nodes.push({ path: context.join('/').replace('//', '/') });
            }
        }

        if (isFileLine(line)) {
            const match = line.match(fileRegex);
            nodes.push({
                path: context.concat(match[2]).join('/').replace('//', '/'),
                size: parseInt(match[1], 10),
            });
        }
    }

    return nodes;
};

const getDirectorySize = (dir: RawDir, allFiles: RawFile[]): number => {
    const matchingFileSizes = allFiles.filter(({ path }) => path.startsWith(dir.path)).map(({ size }) => size);

    return sumUp(matchingFileSizes);
};

export const getDirectorySizes = (lines: string[]) => {
    const nodes = getNodes(lines);

    const directories = nodes.filter(isDirNode);
    const files = nodes.filter(isFileNode);

    return directories.map((dir) => getDirectorySize(dir, files));
};

export const sumDirectoriesBelow100k = (lines: string[]) => {
    const sizes = getDirectorySizes(lines).filter((size) => size <= 100e3);

    return sumUp(sizes);
};

const maxSpaceAvailable = 70e6;
const updateSize = 30e6;

export const getDirectoryToDeleteSize = (lines: string[]) => {
    const [rootSize, ...sizes] = getDirectorySizes(lines).sort((a, b) => b - a);

    const freeSpace = maxSpaceAvailable - rootSize;
    const missingSpace = updateSize - freeSpace;

    return sizes.reverse().find((size) => size >= missingSpace);
};
