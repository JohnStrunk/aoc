import { readLines } from "./common";
import { scoreInput, scoreInputPart2 } from "./day2Module";

// npx ts-node src/day2.ts < input.txt
(async () => {
    const lines = await readLines();
    console.log(scoreInput(lines));
    console.log(scoreInputPart2(lines));
})();
