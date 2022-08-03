interface UserStatus {
    name: string,
    points: number | null,
}

export interface GameInterface {
    status: 'busy' | 'complete',
    state: UserStatus[],
    lastUpdate: number,
}

export class Game {
    private game: GameInterface;
    constructor(creator: UserStatus) {
        console.log('item');
        this.game = { state: [creator], status: 'busy', lastUpdate: Date.now() };
    }
}
