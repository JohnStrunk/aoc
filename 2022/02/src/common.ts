import readline from 'readline';

// Read lines from stdin into an array
export async function readLines() {
    const reader = readline.createInterface({
        input: process.stdin,
        terminal: false
    });

    let lines: string[] = [];
    for await (const line of reader) {
        lines.push(line);
    }
    return lines;
}
