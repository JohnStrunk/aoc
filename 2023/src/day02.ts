#! /usr/bin/env -S npx ts-node

import { readLines } from "./common";

export class Game {
    public id: number;
    public red: number;
    public green: number;
    public blue: number;

    public constructor(id: number, red?: number, green?: number, blue?: number) {
        this.id = id;
        this.red = red || 0;
        this.green = green || 0;
        this.blue = blue || 0;
    }
}

export function parseGame(line: string): Game {
    let games = line.split(/[;:]/);
    const gameString = games.shift() || "";
    const gameMatch = gameString.match(/[0-9]+/);
    if (!gameMatch) {
        throw("No match for line: " + line);
    }
    const gameId = parseInt(gameMatch[0], 10);
    let gameObj = new Game(gameId);

    // console.log(games);
    for (const game of games) {
        const colorMatches = game.matchAll(/([0-9]+) (red|green|blue)/g)
        if (!colorMatches) {
            throw("No color match for line: " + line);
        }
        const matchList = Array.from(colorMatches);
        for (const round of matchList) {
            const color = round[2];
            const count = parseInt(round[1], 10);
            switch (color) {
                case "red":
                    gameObj.red = Math.max(gameObj.red, count);
                    break;
                case "green":
                    gameObj.green = Math.max(gameObj.green, count);
                    break;
                case "blue":
                    gameObj.blue = Math.max(gameObj.blue, count);
                    break;
            }
        }
    }
    return gameObj;
}

export function gamePossible(game: Game, red: number, green: number, blue: number): boolean {
    return game.red <= red && game.green <= green && game.blue <= blue;
}

export function sumGameIds(games: Game[]): number {
    let sum = 0;
    for (const game of games) {
        if (gamePossible(game, 12, 13, 14)) {
            sum += game.id;
        }
    }
    return sum;
}

export function cubePower(game: Game): number {
    return game.red * game.green * game.blue;
}

if (require.main === module) {
    (async () => {
        const lines = await readLines();
        const games = lines.map(parseGame);
        console.log("part 1: " + sumGameIds(games));

        const cubePowers = games.map(cubePower);
        const sumCubePowers = cubePowers.reduce((a, b) => a + b, 0);
        console.log("part 2: " + sumCubePowers);
    })();
}
