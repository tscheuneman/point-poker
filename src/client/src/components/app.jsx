import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  

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
          App
          <p>Connected: { '' + isConnected }</p>
        </div>

      </>
    );
  }

  export default App;