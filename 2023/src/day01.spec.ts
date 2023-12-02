import assert from 'assert';
import {
    lineToCalibrationValueDigitOnly,
    lineToCalibrationValueWithWords
} from './day01';

describe('day01', function() {
    describe('lineToCalibrationValue', function() {
        it('should parse a number-only line', function() {
            assert.equal(lineToCalibrationValueDigitOnly('23'), 23);
        });
        it('should parse a line w/ a char in the middle', function() {
            assert.equal(lineToCalibrationValueDigitOnly('4x3'), 43);
        });
        it('should parse a line that starts w/ a char', function() {
            assert.equal(lineToCalibrationValueDigitOnly('z47'), 47);
        });
        it('should parse a line that ends w/ a char', function() {
            assert.equal(lineToCalibrationValueDigitOnly('75q'), 75);
        });
        it('should parse a line w/ extra numbers', function() {
            assert.equal(lineToCalibrationValueDigitOnly('754'), 74);
        });
        it('should work', function() {
            assert.equal(lineToCalibrationValueDigitOnly('hello4there3dude2yep98f'), 48);
        });
        it('should throw an error if no numbers', function() {
            assert.throws(() => lineToCalibrationValueDigitOnly('hellothere'), /No match for line/);
        });
        it('should return x + 10x if x is the only number', function() {
            assert.equal(lineToCalibrationValueDigitOnly('7'), 77);
            assert.equal(lineToCalibrationValueDigitOnly('x8x'), 88);
        });
    });

    describe('lineToCalibrationValueWithWords', function() {
        it('should throw an error if no numbers', function() {
            assert.throws(() => lineToCalibrationValueWithWords('hellothere'), /No match for line/);
        });
        const testCases: [string, number][] = [
            ['two1nine', 29],
            ['eightwothree', 83],
            ['abcone2threexyz', 13],
            ['xtwone3four', 24],
            ['4nineeightseven2', 42],
            ['zoneight234', 14],
            ['7pqrstsixteen', 76],
        ]
        testCases.forEach(([line, expected]) => {
            it(`should parse ${line}`, function() {
                assert.equal(lineToCalibrationValueWithWords(line), expected);
            });
        });
    });
});
