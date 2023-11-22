import readline from 'readline';

async function processInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let elves: number[] = [];
    let currentElf: number = 0;

    for await (const line of rl) {
        if (line.length === 0) {
            elves.push(currentElf);
            currentElf = 0;
        } else {
            currentElf += parseInt(line);
        }
    }
    if (currentElf > 0) {
        elves.push(currentElf);
    }

    return elves
}

async function main() {
    const elves = await processInput();
    console.log(elves);
    elves.sort((a, b) => b - a);
    console.log(elves);
    const top3 = elves.slice(0, 3);
    console.log(top3);
    const sumTop3 = top3.reduce((a, b) => a + b, 0);
    console.log(sumTop3);
}

main();
