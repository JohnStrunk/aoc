import { readLines } from "./common";
import { scoreInput } from "./day2Module";

// npx ts-node src/day2.ts < input.txt
(async () => {
    const lines = await readLines();
    const score = scoreInput(lines);
    console.log(score);
})();
