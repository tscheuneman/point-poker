import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import RoomSelector from './roomSelector';

const socket = io();

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomId , setRoomId] = useState(null);


  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
  }, []);

    return (
      <>
        <div style={{
          background: 'green',
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}>
          {
            roomId ? 'ROOM' : <RoomSelector />
          }
        </div>

      </>
    );
  }

  export default App;