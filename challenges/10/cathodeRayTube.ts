import { sumUp } from '../../utility/sumUp';

const noop = 'noop';
const addStart = 'addx ';

const getAddAmount = (line: string) => {
    if (line.startsWith(addStart)) {
        return parseInt(line.slice(5), 10);
    } else {
        throw new TypeError(`non-ADD op found: "${line}"`);
    }
};

export const getRegisterBuffer = (lines: string[], initialValue: number) => {
    const buffer = [initialValue];
    let value = initialValue;

    for (const line of lines) {
        if (line === noop) {
            buffer.push(value);
        } else {
            const amount = getAddAmount(line);
            buffer.push(value);
            value += amount;
            buffer.push(value);
        }
    }

    return buffer;
};

export const sumRegisterAtCycles = (lines: string[], cycles: number[], initialValue: number) => {
    const buffer = getRegisterBuffer(lines, initialValue);

    const valuesAtCycles = cycles.map((cycle) => cycle * buffer[cycle - 1]);

    return sumUp(valuesAtCycles);
};

export const paintPixelLetters = (lines: string[]) => {
    const registerBuffer = getRegisterBuffer(lines, 1).slice(0, -1);

    let output = [];

    for (let i = 0; i < registerBuffer.length; i++) {
        const value = registerBuffer[i];
        const currentX = i % 40;
        if ([currentX - 1, currentX, currentX + 1].includes(value)) {
            output.push('#');
        } else {
            output.push('.');
        }

        if (currentX === 39 && i !== registerBuffer.length - 1) {
            output.push('\n');
        }
    }

    return output.join('');
};
