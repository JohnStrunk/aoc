import assert from 'assert';
import {
    cardValue,
    parseCard,
} from './day04';

describe('2023 - Day 4', () => {
    const cardline = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
    it('should parse a card', () => {
        const cardline = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
        const card = parseCard(cardline);
        assert.equal(card.cardNum, 1);
        assert.equal(card.winners.length, 5);
        assert.equal(card.yours.length, 8);
    });
    it('should return the value of a card', () => {
        const card = parseCard(cardline);
        assert.equal(cardValue(card), 8);
    });
});
