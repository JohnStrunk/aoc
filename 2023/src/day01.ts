#! /usr/bin/env -S npx ts-node

import { readLines, trimLines } from "./common";

export function lineToCalibrationValueDigitOnly(line: string): number {
    const match2 = line.match("^[^0-9]*([0-9]).*([0-9])[^0-9]*$");
    if (match2) {
        const number = parseInt(match2[1] + match2[2]);
        return number;
    }
    const match1 = line.match("^[^0-9]*([0-9])[^0-9]*$");
    if (match1) {
        const number = parseInt(match1[1] + match1[1], 10);
        return number;
    }

    throw("No match for line: " + line);
}

export function parseWordNumber(word: string): string {
    const words: { [key: string]: string } = {
        zero: "0",
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
    };
    if (!words[word]) {
        return word;
    }
    return words[word];
}

export function lineToCalibrationValueWithWords(line: string): number {
    const match = line.matchAll(/zero|one|two|three|four|five|six|seven|eight|nine|[0-9]/g);
    const matchList = Array.from(match);
    if (matchList.length === 0) {
        throw("No match for line: " + line);
    }
    const first = matchList[0][0];
    const last = matchList[matchList.length - 1][0];
    const value = parseInt(parseWordNumber(first) + parseWordNumber(last), 10);
    // console.log(line, first, last, value);
    return value;
}

if (require.main === module) {
    (async () => {
        const lines = trimLines(await readLines());

        // const calibrationValues = lines.map(lineToCalibrationValueDigitOnly);
        // const sum = calibrationValues.reduce((a, b) => a + b, 0);
        // console.log("Part1 - Sum: " + sum);

        const part2CalibrationValues = lines.map(lineToCalibrationValueWithWords);
        const part2Sum = part2CalibrationValues.reduce((a, b) => a + b, 0);
        console.log("Part2 - Sum: " + part2Sum);
    })();
}
