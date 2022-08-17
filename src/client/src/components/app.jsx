import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import RoomSelector from './roomSelector';
import GameRoom from './gameRoom';
const socket = io();

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [name , setName] = useState(null);
  const [game, setGame] = useState(null);
  const [roomName, setRoomName] = useState(null);

  useEffect(() => {
    setName(localStorage.getItem('point-poker.displayName'));
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('joinedGame', (game) => {
      setGame(game);
    });
    socket.on('refreshGameState', (game) => {
      setGame(game);
    });
    socket.on('resetGame', (game) => {
      setisFinished(false);
      setGame(game);
    });
    
  }, []);

  const handleRoomJoinCreate = (roomName) => {
    setRoomName(roomName);
    socket.emit('join', JSON.stringify({roomId: roomName, name: name}));
  }
  const handleVoteClick = (points) => {
    socket.emit('vote', JSON.stringify({roomId: roomName, name: name , points: points}));
  }

  const handleResetGame = () => {
    socket.emit('resetGame', JSON.stringify({roomId: roomName}));
  }

  const selectionScreen = () => {
    if(name) {
      if (game) {
        return <GameRoom gameState={game} name={name} onVoteClick={handleVoteClick} resetGame={handleResetGame} />
      } else {
        return <RoomSelector onRoomJoinCreate={handleRoomJoinCreate} />
      }
    } else {
      return 'noName';
    }
  }

    return (
      <>
        <div style={{
          background: 'green',
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}>
          {
            selectionScreen()
          }
        </div>

      </>
    );
  }

  export default App;