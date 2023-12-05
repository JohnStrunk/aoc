import assert from 'assert';
import {
    findNums,
    sumMarkedNumbers,
} from './day03';

describe('2023 - Day 3', () => {
    const case1 = [
        "=2.......%",
        "........8.",
        "....31....",
        ".........4",
        "7+......2x",
    ];
    it('should find the numbers', () => {
        const nums = findNums(case1);
        assert.equal(nums.length, 6);
    });
    it('should sum the marked numbers', () => {
        assert.equal(sumMarkedNumbers(case1, findNums(case1)), 23);
    });
});
