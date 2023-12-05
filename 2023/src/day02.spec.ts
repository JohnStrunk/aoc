import assert from 'assert';
import {
    cubePower,
    Game,
    parseGame,
    sumGameIds,
} from './day02';

describe('2023 - Day 2', () => {
    describe('parseGame', () => {
        const testCases: [string, Game][] = [
            ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', new Game(1, 4, 2, 6)],
            ['Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', new Game(2, 1, 3, 4)],
            ['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', new Game(3, 20, 13, 6)],
            ['Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', new Game(4, 14, 3, 15)],
            ['Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', new Game(5, 6, 3, 2)],
        ];
        testCases.forEach(([line, expected]) => {
            it(`should parse ${line.slice(0,6)}`, () => {
                const exp = parseGame(line);
                assert.equal(exp.id, expected.id);
                assert.equal(exp.red, expected.red);
                assert.equal(exp.green, expected.green);
                assert.equal(exp.blue, expected.blue);
            });
        });
        it('should sum game ids', () => {
            const games = testCases.map(input => parseGame(input[0]));
            assert.equal(sumGameIds(games), 8);
        });
    })

    describe('cubePower', () => {
        const testCases: [string, number][] = [
            ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', 48],
            ['Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', 12],
            ['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', 1560],
            ['Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', 630],
            ['Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', 36],
        ];
        testCases.forEach(([line, expected]) => {
            it(`should calculate cube power for ${line.slice(0,6)}`, () => {
                const game = parseGame(line);
                assert.equal(cubePower(game), expected);
            });
        });
    });
});
