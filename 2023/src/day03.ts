#! /usr/bin/env -S npx ts-node

import {
    readLines,
    trimLines,
} from "./common";
import assert from 'assert';

class Num {
    constructor(public value: number,
        public row: number,
        public colStart:number,
        public colEnd: number) {}
}

class Coord {
    constructor(public x: number, public y: number) {}
}

export function findNums(grid: string[]): Num[] {
    let numList: Num[] = [];

    const lineLen = grid[0].length;
    for (let i = 0; i < grid.length; i++) {
        const line = grid[i];
        assert(line.length === lineLen, `Line ${i} is ${line.length} chars long, expected ${lineLen}`)
        const nums = line.matchAll(/\d+/g);
        for(const match of nums) {
            const num = parseInt(match[0], 10);
            const colStart = match.index || 0;
            const colEnd = colStart + match[0].length - 1;
            numList.push(new Num(num, i, colStart, colEnd));
        }
    }

    return numList;
}

export function findStars(grid: string[]): Coord[] {
    let starList: Coord[] = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '*') {
                starList.push(new Coord(j, i));
            }
        }
    }

    return starList;
}

export function numsAdjacentToCoord(nums: Num[], coord: Coord): Num[] {
    return nums.filter(num => {
        if (coord.y < num.row - 1 || coord.y > num.row + 1) {
            return false;
        }
        if (coord.x < num.colStart - 1 || coord.x > num.colEnd + 1) {
            return false;
        }
        return true;
    });
}

export function symbolInRegion(grid: string[], x1: number, y1: number, x2: number, y2: number): boolean {
    for (let i = y1; i <= y2; i++) {
        const line = grid[i];
        for (let j = x1; j <= x2; j++) {
            const char = line[j];
            if (!/[\.\d]/.test(char)) {
                return true;
            }
        }
    }
    return false;
}

export function sumMarkedNumbers(grid: string[], nums: Num[]): number {
    let sum = 0;
    const maxRow = grid.length - 1;
    nums.forEach(num => {
        const x1 = Math.max(num.colStart - 1, 0);
        const y1 = Math.max(num.row - 1, 0);
        const x2 = Math.min(num.colEnd + 1, grid[y1].length - 1);
        const y2 = Math.min(num.row + 1, maxRow);
        if (symbolInRegion(grid, x1, y1, x2, y2)) {
            sum += num.value;
        }
    });
    return sum;
}

export function findGearRatios(grid: string[]): number[] {
    const nums = findNums(grid);
    const stars = findStars(grid);

    const ratios: number[] = [];
    stars.forEach(star => {
        const adjNums = numsAdjacentToCoord(nums, star);
        if (adjNums.length === 2) {
            const [num1, num2] = adjNums;
            const ratio = num1.value * num2.value;
            ratios.push(ratio);
        }
    });

    return ratios;
}

if (require.main === module) {
    (async () => {
        const grid = trimLines(await readLines());

        const numbers = findNums(grid);
        const sumMarked = sumMarkedNumbers(grid, numbers);
        console.log("Part 1: " + sumMarked);

        const ratios = findGearRatios(grid);
        const sumRatios = ratios.reduce((a, b) => a + b, 0);
        console.log("Part 2: " + sumRatios);
    })();
}
