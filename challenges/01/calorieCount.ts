export const getItems = (lines: string[]): number[] => {
    return lines.map((x) => parseInt(x, 10));
};

export const getElfTotals = (items: number[]): number[] => {
    const elves = [0];

    for (const item of items) {
        if (isNaN(item)) {
            elves.push(0);
        } else {
            elves[elves.length - 1] += item;
        }
    }

    return elves;
};

export const maxCalories = (lines: string[]): number => {
    const items = getItems(lines);
    const elves = getElfTotals(items);

    return Math.max(...elves);
};

export const topThreeCalories = (lines: string[]): number => {
    const items = getItems(lines);
    const elves = getElfTotals(items);

    elves.sort((a, b) => b - a);
    const [a, b, c] = elves;

    return a + b + c;
};
