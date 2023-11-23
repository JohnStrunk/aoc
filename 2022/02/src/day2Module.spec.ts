import assert from 'assert';
import { charToRPS, compareRPS, convertLine, RPS, scoreRound } from './day2Module';

describe('charToRPS', function(){
    it('should return ROCK when given A', function(){
        assert.equal(charToRPS('A'), RPS.ROCK);
    });
    it('should return ROCK when given X', function(){
        assert.equal(charToRPS('X'), RPS.ROCK);
    });
    it('should return PAPER when given B', function(){
        assert.equal(charToRPS('B'), RPS.PAPER);
    });
    it('should return PAPER when given Y', function(){
        assert.equal(charToRPS('Y'), RPS.PAPER);
    });
    it('should return SCISSORS when given C', function(){
        assert.equal(charToRPS('C'), RPS.SCISSORS);
    });
    it('should return SCISSORS when given Z', function(){
        assert.equal(charToRPS('Z'), RPS.SCISSORS);
    });
});

describe('compareRPS', function(){
    it('should return 0 when given two of the same', function(){
        assert.equal(compareRPS(RPS.ROCK, RPS.ROCK), 0);
        assert.equal(compareRPS(RPS.PAPER, RPS.PAPER), 0);
        assert.equal(compareRPS(RPS.SCISSORS, RPS.SCISSORS), 0);
    });
    it('should return 1 when given a winning combination', function(){
        assert.equal(compareRPS(RPS.ROCK, RPS.SCISSORS), 1);
        assert.equal(compareRPS(RPS.PAPER, RPS.ROCK), 1);
        assert.equal(compareRPS(RPS.SCISSORS, RPS.PAPER), 1);
    });
    it('should return 2 when given a losing combination', function(){
        assert.equal(compareRPS(RPS.ROCK, RPS.PAPER), 2);
        assert.equal(compareRPS(RPS.PAPER, RPS.SCISSORS), 2);
        assert.equal(compareRPS(RPS.SCISSORS, RPS.ROCK), 2);
    });
});

describe('convertLine', function(){
    it('should convert a line to an array of RPS', function(){
        assert.deepEqual(convertLine('A X'), [RPS.ROCK, RPS.ROCK]);
        assert.deepEqual(convertLine('B Z'), [RPS.PAPER, RPS.SCISSORS]);
    });
});

describe('round scoring', function(){
    it('should correctly score the examples', function(){
        assert.equal(scoreRound(convertLine('A Y')), 8);
        assert.equal(scoreRound(convertLine('B X')), 1);
        assert.equal(scoreRound(convertLine('C Z')), 6);
    });
});
