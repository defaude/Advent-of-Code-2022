import isNumber from 'lodash/isNumber';
import isArray from 'lodash/isArray';
import { sumUp } from '../../utility/sumUp';

type Packet = number | Packet[] | undefined;
type Pair = [Packet, Packet];

const toPacket = (line: string): Packet[] => JSON.parse(line);

const parse = (lines: string[]): Pair[] => {
    lines = lines.filter((line) => !!line);

    const result: Pair[] = [];
    while (lines.length) {
        const [one, two] = lines.splice(0, 2).map(toPacket);
        result.push([one, two]);
    }

    return result;
};

export const isPairInRightOrder = ([left, right]: Pair): boolean | undefined => {
    if (right === undefined) {
        return false;
    }

    if (left === undefined) {
        return true;
    }

    const leftIsNumber = isNumber(left);
    const rightIsNumber = isNumber(right);
    const leftIsArray = isArray(left);
    const rightIsArray = isArray(right);

    if (leftIsNumber && rightIsNumber && left !== right) {
        return left < right;
    }

    if (leftIsNumber && rightIsArray) {
        const result = isPairInRightOrder([[left], right]);
        if (result !== undefined) {
            return result;
        }
    }

    if (leftIsArray && rightIsNumber) {
        const result = isPairInRightOrder([left, [right]]);
        if (result !== undefined) {
            return result;
        }
    }

    if (leftIsArray && rightIsArray) {
        const length = Math.max(left.length, right.length);

        for (let i = 0; i < length; i++) {
            const l = left[i];
            const r = right[i];
            const result = isPairInRightOrder([l, r]);
            if (result !== undefined) {
                return result;
            }
        }
    }
};

export const sumCorrectlyOrderedPairsIndices = (lines: string[]) => {
    const pairs = parse(lines);
    const correctIndices: number[] = [];

    for (let i = 0; i < pairs.length; i++) {
        if (isPairInRightOrder(pairs[i])) {
            correctIndices.push(i + 1);
        }
    }

    return sumUp(correctIndices);
};

const isSeparator = (packet: Packet) => {
    if (isArray(packet) && packet.length === 1) {
        const subPacket = packet[0];
        if (isArray(subPacket) && subPacket.length === 1) {
            return subPacket[0] === 2 || subPacket[0] === 6;
        }
    }
    return false;
};

export const multiplySeparatorPacketIndices = (lines: string[]) => {
    const packets = lines.filter((line) => !!line).map(toPacket);
    packets.push([[2]]);
    packets.push([[6]]);
    packets.sort((a, b) => {
        if (isPairInRightOrder([a, b])) {
            return -1;
        } else {
            return 1;
        }
    });

    let decoderKey = 1;

    for (let i = 0; i < packets.length; i++) {
        if (isSeparator(packets[i])) {
            decoderKey *= i + 1;
        }
    }

    return decoderKey;
};
