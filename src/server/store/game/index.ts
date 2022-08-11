export interface UserStatus {
    name: string,
    id: string,
    points: number | null,
}

export enum GAME_STATE {
    BUSY = 'busy',
    COMPLETE = 'complete'
}

export interface GameInterface {
    status: GAME_STATE,
    state: UserStatus[],
    lastUpdate: number,
}

export class Game {
    private gameStatus = GAME_STATE.BUSY;
    private gameState: UserStatus[] = [];
    private lastUpdate: number;

    constructor(user: UserStatus) {
        this.gameStatus = GAME_STATE.BUSY;
        this.gameState = [user];
        this.lastUpdate = Date.now();
    }

    join(user: UserStatus) {
        this.gameState.push(user);
        this.lastUpdate = Date.now();
    }

    vote(name: string, points: number, cb: () => void) {
        const user = this.gameState.find(elm => elm.name === name);
        if(user) {
            user.points = points;
        }
        this.determineGameState();

        if(this.gameStatus === GAME_STATE.COMPLETE) {
            cb();
        }
    }

    getGame(): GameInterface {
        return {
            state: this.gameState,
            status: this.gameStatus,
            lastUpdate: this.lastUpdate,
        }
    }

    numberParticipents(): number {
        return this.gameState.length;
    }

    removeUser(userId: string): void {
        this.gameState = this.gameState.filter((val) => val.id !== userId);
        this.lastUpdate = Date.now();
    }

    private determineGameState() {
        let gameIsValid = true;
        this.gameState.forEach(userState => {
            if(userState.points === null) {
                gameIsValid = false;
            }
        });

        if(gameIsValid) {
            this.gameStatus = GAME_STATE.COMPLETE;
        }
        
    }
}
