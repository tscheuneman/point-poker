import { Game, UserStatus } from './game';

export class GameManager {
    private static instance: GameManager;
    private games: Record<string, Game>;
    private users: Record<string, string>;

    private constructor() {
        this.games = {};
        this.users = {};
    }

    public static getInstance(): GameManager {
        if(!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    joinGame(gameId: string, user: UserStatus): Game {
        this.users[user.id] = gameId;

        if(!this.games[gameId]) {
            this.games[gameId] = new Game(user);
            return this.games[gameId];
        } else {
            const game = this.getGame(gameId);
            game.join(user);
            return game;
        }
    }

    getGame(gameId: string): Game {
        return this.games[gameId] ?? null;
    }

    getGames(): Record<string, Game> {
        return this.games;
    }
    getUsers() {
        return this.users;
    }
    removeUser(userId: string) {
        const gameId = this.users[userId];
        if(gameId) {
            const game = this.getGame(gameId);
            game.removeUser(userId);
            delete this.users[userId];
            if (game.numberParticipents() === 0) {
                delete this.games[gameId];
            }
        }

    }
}