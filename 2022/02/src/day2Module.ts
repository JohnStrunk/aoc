export enum RPS {ROCK, PAPER, SCISSORS};

export function charToRPS(char: string): RPS {
    switch(char) {
        case 'A':
        case 'X':
            return RPS.ROCK;
        case 'B':
        case 'Y':
            return RPS.PAPER;
        case 'C':
        case 'Z':
            return RPS.SCISSORS;
        default:
            throw new Error('Invalid character');
    }
}

// Determine the winner of a round of rock-paper-scissors
// Return 1 if player 1 wins, 2 if player 2 wins, or 0 for a tie
export function compareRPS(a: RPS, b: RPS): number {
    if (a === b) {
        return 0;
    }
    switch(a) {
        case RPS.ROCK:
            return b === RPS.PAPER ? 2 : 1;
        case RPS.PAPER:
            return b === RPS.SCISSORS ? 2 : 1;
        case RPS.SCISSORS:
            return b === RPS.ROCK ? 2 : 1;
    }
}

// Convert a line into the equivalent array of RPS
export function convertLine(line: string): RPS[] {
    return line.split(' ').map(charToRPS);
}

// Score a round of rock-paper-scissors
export function scoreRound(values: RPS[]): number {
    let score = 0;

    // Round winner
    switch (compareRPS(values[0], values[1])) {
        case 1: // loss
            break;
        case 2: // win
            score += 6;
            break;
        case 0: // tie
            score += 3;
            break;
    }

    // My choice
    switch (values[1]) {
        case RPS.ROCK:
            score += 1;
            break;
        case RPS.PAPER:
            score += 2;
            break;
        case RPS.SCISSORS:
            score += 3;
            break;
    }

    return score;
}

export function scoreInput(input: string[]): number {
    let score = 0;
    for (const line of input) {
        score += scoreRound(convertLine(line));
    }
    return score;
}
