import { readLines } from "./common";

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

// Convert a line of input into an array of RPS, but for part 2 where the 2nd
// character is the desired result, not the player's choice
export function lineResultToRPS(line: string): RPS[] {
    const chars = line.split(' ');

    let player1: RPS = charToRPS(chars[0]);
    let player2: RPS = RPS.ROCK;
    switch (chars[1]) {
        case 'X': // need to lose
            switch (player1) {
                case RPS.ROCK:
                    player2 = RPS.SCISSORS;
                    break;
                case RPS.PAPER:
                    player2 = RPS.ROCK;
                    break;
                case RPS.SCISSORS:
                    player2 = RPS.PAPER;
                    break;
            }
            break;
        case 'Y': // need to tie
            player2 = player1;
            break;
        case 'Z': // need to win
            switch (player1) {
                case RPS.ROCK:
                    player2 = RPS.PAPER;
                    break;
                case RPS.PAPER:
                    player2 = RPS.SCISSORS;
                    break;
                case RPS.SCISSORS:
                    player2 = RPS.ROCK;
                    break;
            }
            break;
        }
    return [player1, player2];
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

export function scoreInputPart2(input: string[]): number {
    let score = 0;
    for (const line of input) {
        score += scoreRound(lineResultToRPS(line));
    }
    return score;
}

// npx ts-node src/day2.ts < input.txt
if (require.main === module) {
    (async () => {
        const lines = await readLines();
        console.log(scoreInput(lines));
        console.log(scoreInputPart2(lines));
    })();
}
