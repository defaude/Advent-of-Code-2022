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

enum DesiredOutcome {
    LOSE = 'X',
    DRAW = 'Y',
    WIN = 'Z',
}

type Round = [Opponent, Player];
type DynamicRound = [Opponent, DesiredOutcome];

const lineRgx = /^[ABC] [XYZ]$/;

const getRounds = <T extends Round | DynamicRound>(lines: string[]) => {
    return lines
        .filter((line) => lineRgx.test(line))
        .map((line) => line.split(' ')) as unknown as T[];
};

const moves = {
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

const movesForOutcome = {
    [Opponent.ROCK]: {
        [DesiredOutcome.LOSE]: Player.SCISSORS,
        [DesiredOutcome.DRAW]: Player.ROCK,
        [DesiredOutcome.WIN]: Player.PAPER,
    },
    [Opponent.PAPER]: {
        [DesiredOutcome.LOSE]: Player.ROCK,
        [DesiredOutcome.DRAW]: Player.PAPER,
        [DesiredOutcome.WIN]: Player.SCISSORS,
    },
    [Opponent.SCISSORS]: {
        [DesiredOutcome.LOSE]: Player.PAPER,
        [DesiredOutcome.DRAW]: Player.SCISSORS,
        [DesiredOutcome.WIN]: Player.ROCK,
    },
};

const getResultScore = ([opponent, player]: Round) => {
    return moves[opponent][player];
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

export const staticRockPaperScissors = (lines: string[]) =>
    getRounds<Round>(lines)
        .map((round) => getResultScore(round) + getOwnScore(round[1]))
        .reduce((result, score) => result + score, 0);

export const dynamicRockPaperScissors = (lines: string[]) =>
    getRounds<DynamicRound>(lines)
        .map(([opponent, desiredOutcome]) => [
            opponent,
            movesForOutcome[opponent][desiredOutcome],
        ])
        .map((round: Round) => getResultScore(round) + getOwnScore(round[1]))
        .reduce((result, score) => result + score, 0);
