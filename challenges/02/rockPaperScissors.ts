enum OpponentMove {
    ROCK = 'A',
    PAPER = 'B',
    SCISSORS = 'C',
}

enum PlayerMove {
    ROCK = 'X',
    PAPER = 'Y',
    SCISSORS = 'Z',
}

const roundScores = {
    [OpponentMove.ROCK]: {
        [PlayerMove.ROCK]: 3,
        [PlayerMove.PAPER]: 6,
        [PlayerMove.SCISSORS]: 0,
    },
    [OpponentMove.PAPER]: {
        [PlayerMove.ROCK]: 0,
        [PlayerMove.PAPER]: 3,
        [PlayerMove.SCISSORS]: 6,
    },
    [OpponentMove.SCISSORS]: {
        [PlayerMove.ROCK]: 6,
        [PlayerMove.PAPER]: 0,
        [PlayerMove.SCISSORS]: 3,
    },
};

const getRoundScore = ([opponent, player]: Round) =>
    roundScores[opponent][player];

const moveScores = {
    [PlayerMove.ROCK]: 1,
    [PlayerMove.PAPER]: 2,
    [PlayerMove.SCISSORS]: 3,
};

const getMoveScore = (player: PlayerMove) => moveScores[player];

type Round = [OpponentMove, PlayerMove];

enum DesiredOutcome {
    LOSE = 'X',
    DRAW = 'Y',
    WIN = 'Z',
}

const movesForOutcome = {
    [OpponentMove.ROCK]: {
        [DesiredOutcome.LOSE]: PlayerMove.SCISSORS,
        [DesiredOutcome.DRAW]: PlayerMove.ROCK,
        [DesiredOutcome.WIN]: PlayerMove.PAPER,
    },
    [OpponentMove.PAPER]: {
        [DesiredOutcome.LOSE]: PlayerMove.ROCK,
        [DesiredOutcome.DRAW]: PlayerMove.PAPER,
        [DesiredOutcome.WIN]: PlayerMove.SCISSORS,
    },
    [OpponentMove.SCISSORS]: {
        [DesiredOutcome.LOSE]: PlayerMove.PAPER,
        [DesiredOutcome.DRAW]: PlayerMove.SCISSORS,
        [DesiredOutcome.WIN]: PlayerMove.ROCK,
    },
};

type DynamicRound = [OpponentMove, DesiredOutcome];

const getMoveForOutcome = ([opponent, desiredOutcome]: DynamicRound) =>
    movesForOutcome[opponent][desiredOutcome];

const lineRgx = /^[ABC] [XYZ]$/;

const getRounds = <T extends Round | DynamicRound>(lines: string[]) => {
    return lines
        .filter((line) => lineRgx.test(line))
        .map((line) => line.split(' ')) as unknown as T[];
};

const getRoundScoreSum = (rounds: Round[]) =>
    rounds
        .map((round) => getRoundScore(round) + getMoveScore(round[1]))
        .reduce((result, score) => result + score, 0);

export const staticRockPaperScissors = (lines: string[]) => {
    const rounds = getRounds<Round>(lines);
    return getRoundScoreSum(rounds);
};

export const dynamicRockPaperScissors = (lines: string[]) => {
    const rounds = getRounds<DynamicRound>(lines).map<Round>((round) => [
        round[0],
        getMoveForOutcome(round),
    ]);
    return getRoundScoreSum(rounds);
};
