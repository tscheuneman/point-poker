import type { Server } from 'socket.io';
import { GameManager } from '../store'
import { UserStatus } from '../store/game'

const store = GameManager.getInstance();

enum GAME_EVENTS {
    CONNECT = 'connection',
    DISCONNECT = 'disconnect',
    VOTE = 'vote',
    JOIN = 'join'
} 

interface JoinInterface {
    roomId: string;
    name: string;
}

interface VoteInterface {
    roomId: string;
    name: string;
    points: number;
}

const handleSockets = (sockets: Server) => {
    sockets.on(GAME_EVENTS.CONNECT, (socket) => {
        console.log('a user connected', socket.id);
        socket.on(GAME_EVENTS.DISCONNECT, () => {
            store.removeUser(socket.id);
          console.log('user disconnected', socket.id);
        });

        socket.on(GAME_EVENTS.JOIN, (joinReq: string) => {
            const joinJson: JoinInterface = JSON.parse(joinReq);
            const user: UserStatus = {
                name: joinJson.name,
                id: socket.id,
                points: null,
            };
            socket.join(`room:${joinJson.roomId}`);
            store.joinGame(joinJson.roomId, user);
            console.log('Joined Room : ' + joinJson.roomId);
        });

        socket.on(GAME_EVENTS.VOTE, (voteReq: string) => {
            const voteJson: VoteInterface = JSON.parse(voteReq);
            const game = store.getGame(voteJson.roomId);
            game.vote(voteJson.name, voteJson.points, () => {
                sockets.to(`room:${voteJson.roomId}`).emit('flip');
            });
        });
      });
}

export default handleSockets;