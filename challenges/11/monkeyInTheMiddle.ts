import chunk from 'lodash/chunk';

const opRgx = /old (.) (\d+|old)/;

const getOp = (line: string): ((x: number) => number) => {
    const [_, operand, amountStr] = line.match(opRgx);
    return (x: number) => {
        const amount = amountStr === 'old' ? x : parseInt(amountStr, 10);

        switch (operand) {
            case '+':
                return x + amount;
            case '-':
                return x - amount;
            case '*':
                return x * amount;
            case '/':
                return x / amount;
            default:
                throw new TypeError(`invalid operand ${operand}`);
        }
    };
};

class Monkey {
    private items: number[];
    private readonly operation: (x: number) => number;
    private readonly divisor: number;
    private readonly trueTarget: number;
    private readonly falseTarget: number;
    inspections: number;

    constructor(lines: string[]) {
        const [_, itemsLine, opLine, divisorLine, trueTargetLine, falseTargetLine] = lines;

        this.items = itemsLine
            .slice(18)
            .split(', ')
            .map((x) => parseInt(x, 10));
        this.operation = getOp(opLine);
        this.divisor = parseInt(divisorLine.slice(21), 10);
        this.trueTarget = parseInt(trueTargetLine.slice(29));
        this.falseTarget = parseInt(falseTargetLine.slice(30));
        this.inspections = 0;
    }

    inspect(item: number) {
        this.inspections++;
        return this.operation(item);
    }

    applyRelief(item: number) {
        return Math.floor(item / 3);
    }

    test(item: number) {
        return item % this.divisor === 0 ? this.trueTarget : this.falseTarget;
    }

    playRound(monkeys: Monkey[], withRelief: boolean) {
        const reliever = monkeys.map((monkey) => monkey.divisor).reduce((result, divisor) => result * divisor, 1);

        let item: number;
        while ((item = this.items.shift())) {
            item = this.inspect(item);
            if (withRelief) {
                item = this.applyRelief(item);
            } else {
                item = item % reliever;
            }
            const nextMonkey = this.test(item);
            monkeys[nextMonkey].items.push(item);
        }
    }
}

const getMonkeys = (lines: string[]): Monkey[] => {
    let withoutBlanks = lines.filter((line) => line);
    return chunk(withoutBlanks, 6).map((lines) => new Monkey(lines));
};

export const getMonkeyBusinessLevel = (lines: string[], rounds: number, withRelief = true) => {
    const monkeys = getMonkeys(lines);

    for (let i = 0; i < rounds; i++) {
        monkeys.forEach((monkey) => monkey.playRound(monkeys, withRelief));
    }

    const inspections = monkeys.map((monkey) => monkey.inspections);
    const [one, two] = inspections.sort((a, b) => b - a);

    return one * two;
};
