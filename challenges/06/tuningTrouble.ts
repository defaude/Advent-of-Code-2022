import uniq from 'lodash/uniq';

export const containsDuplicateChars = (slice: string) => {
    return uniq(slice.split('')).length < slice.length;
};

const findMarker = (size: number) => (line: string) => {
    for (let i = size; i < line.length; i++) {
        const slice = line.slice(i - size, i);
        if (!containsDuplicateChars(slice)) {
            return i;
        }
    }
    return -1;
};

export const findStartOfPacket = findMarker(4);

export const findStartsOfPackets = (lines: string[]) => {
    return lines.map(findStartOfPacket);
};

export const findStartOfMessage = findMarker(14);

export const findStartsOfMessages = (lines: string[]) => {
    return lines.map(findStartOfMessage);
};
