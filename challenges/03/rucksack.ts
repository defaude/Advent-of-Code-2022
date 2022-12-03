import chunk from 'lodash/chunk';
import intersection from 'lodash/intersection';

const UPPER_CASE_REGEX = /^[A-Z]$/;
const UPPER_CASE_A = 'A'.charCodeAt(0);
const UPPER_CASE_OFFSET = 27;
const LOWER_CASE_A = 'a'.charCodeAt(0);
const LOWER_CASE_OFFSET = 1;

export const splitLine = (line: string) => {
    const length = line.length;
    if (length < 2 || length % 2 !== 0) {
        throw new TypeError(`can not split uneven or empty lines: ${line}`);
    }
    return [line.slice(0, length / 2), line.slice(length / 2)];
};

export const getRucksackDuplicate = (line: string) => {
    const [left, right] = splitLine(line);

    for (const char of left) {
        if (right.includes(char)) {
            return char;
        }
    }

    throw new TypeError(`no duplicate found in line ${line}`);
};

export const isUpperCase = (char: string) => {
    if (!char || char.length !== 1) {
        throw new TypeError(`invalid character "${char} given`);
    }
    return UPPER_CASE_REGEX.test(char);
};

export const getRucksackItemPriority = (item: string) => {
    const char = item.charAt(0);
    if (isUpperCase(char)) {
        return char.charCodeAt(0) + UPPER_CASE_OFFSET - UPPER_CASE_A;
    } else {
        return char.charCodeAt(0) + LOWER_CASE_OFFSET - LOWER_CASE_A;
    }
};

export const getRucksackDuplicatePriority = (line: string) => {
    const dupe = getRucksackDuplicate(line);
    return getRucksackItemPriority(dupe);
};

export const sumRucksackDuplicates = (lines: string[]) => {
    return lines
        .filter((line) => line.trim().length > 0)
        .map(getRucksackDuplicatePriority)
        .reduce((result, line) => result + line, 0);
};

type Group = [string, string, string];

export const findRucksackGroupBadge = (lines: Group) => {
    const [one, two, three] = lines.map((line) => line.split(''));
    return intersection(one, two, three)[0];
};

export const sumRucksackGroups = (lines: string[]) => {
    const groups = chunk(
        lines.filter((line) => line.trim().length > 0),
        3
    ) as Group[];

    const badges = groups.map(findRucksackGroupBadge);
    const badgeValues = badges.map(getRucksackItemPriority);
    return badgeValues.reduce((result, value) => result + value, 0);
};
