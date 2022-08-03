import { Game } from './game';

export class GameManager {
    private static instance: GameManager;
    private games: Record<string, Game>;
    private constructor() {
        console.log('item');
    }

    public static getInstance(): GameManager {
        if(!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    createGame(gameId, creator): Game {
        if(!this.games[gameId]) {
            this.games[gameId] = new Game(creator);
        }

        return this.games[gameId];
    }

    getGame(gameId): Game {
        return this.games[gameId] ?? null;
    }
}