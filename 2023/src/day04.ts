#! /usr/bin/env -S npx ts-node

import {
    readLines,
    trimLines,
} from "./common";
// import assert from 'assert';

class Card {
    public count: number;

    constructor(public cardNum: number, public winners: number[], public yours: number[]) {
        this.count = 1;
    }
}

export function parseCard(line: string): Card {
    const cardParts = line.match(/Card\s+(\d+):([\s\d]+)\|([\s\d]+)$/);
    if (!cardParts) {
        throw new Error(`Unable to parse card: ${line}`);
    }
    const cardNum = parseInt(cardParts[1], 10);
    const winnerMatches = cardParts[2].matchAll(/\d+/g);
    let winners: number[] = [];
    if (winnerMatches) {
        for(let w of winnerMatches) {
            winners.push(parseInt(w[0], 10));
        }
    }
    const yoursMatches = cardParts[3].matchAll(/\d+/g);
    let yours: number[] = [];
    if (yoursMatches) {
        for(let y of yoursMatches) {
            yours.push(parseInt(y[0], 10));
        }
    }
    return new Card(cardNum, winners, yours);
}

export function cardMatches(card: Card): number {
    let matches = 0;
    for(let y of card.yours) {
        if (card.winners.includes(y)) {
            matches++;
        }
    }
    return matches;
}

export function cardValue(card: Card): number {
    let matches = cardMatches(card);
    if (matches === 0) {
        return 0;
    }
    return 2 ** (matches - 1);
}

export function cardDuper(cards: Card[]): Card[] {
    for (let i = 0; i < cards.length; i++) {
        const matches = cardMatches(cards[i]);
        for (let m = 0; m < matches; m++) {
            cards[i+1+m].count += cards[i].count;
        }
    }
    return cards;
}

if (require.main === module) {
    (async () => {
        const lines = trimLines(await readLines());
        const totalValue = lines.map(parseCard).map(cardValue).reduce((a, b) => a + b, 0);
        console.log(`Part 1: ${totalValue}`);

        const dupedCards = cardDuper(lines.map(parseCard));
        const totalCards = dupedCards.map(c => c.count).reduce((a, b) => a + b, 0);
        console.log(`Part 2: ${totalCards}`);
    })();
}
