import { assertNever } from '../../utility/assertNever';

enum Opponent {
    ROCK = 'A',
    PAPER = 'B',
    SCISSORS = 'C',
}

enum Player {
    ROCK = 'X',
    PAPER = 'Y',
    SCISSORS = 'Z',
}

type Round = [Opponent, Player];

const lineRgx = /^[ABC] [XYZ]$/;

const getRounds = (lines: string[]) => {
    return lines
        .filter((line) => lineRgx.test(line))
        .map((line) => line.split(' ')) as unknown as Round[];
};

const getOwnScore = (player: Player) => {
    switch (player) {
        case Player.ROCK:
            return 1;
        case Player.PAPER:
            return 2;
        case Player.SCISSORS:
            return 3;
        default:
            assertNever(player);
    }
};

const results = {
    [Opponent.ROCK]: {
        [Player.ROCK]: 3,
        [Player.PAPER]: 6,
        [Player.SCISSORS]: 0,
    },
    [Opponent.PAPER]: {
        [Player.ROCK]: 0,
        [Player.PAPER]: 3,
        [Player.SCISSORS]: 6,
    },
    [Opponent.SCISSORS]: {
        [Player.ROCK]: 6,
        [Player.PAPER]: 0,
        [Player.SCISSORS]: 3,
    },
};

const getResultScore = ([opponent, player]: Round) => {
    return results[opponent][player];
};

const getScore = (round: Round): number => {
    return getOwnScore(round[1]) + getResultScore(round);
};

export const rockPaperScissors = (lines: string[]) => {
    return getRounds(lines)
        .map(getScore)
        .reduce((result, score) => result + score, 0);
};
