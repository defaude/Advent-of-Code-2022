export const maxCalories = (lines: string[]): number => {
    const elves = [0];

    const asNumbers = lines.map((x) => parseInt(x, 10));
    for (const n of asNumbers) {
        if (isNaN(n)) {
            // start a new elf
            elves.push(0);
        } else {
            elves[elves.length - 1] += n;
        }
    }

    return Math.max(...elves);
};
