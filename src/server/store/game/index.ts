export class Game {
    private game: any;
    constructor(creator) {
        console.log('item');
        this.game = [{
            ...creator
        }];
    }
}