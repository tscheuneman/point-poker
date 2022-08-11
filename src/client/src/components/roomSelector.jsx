import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';

const RoomSelector = (props) => {
  const [rooms, setRooms] = useState([]);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    fetch('/api/rooms')
      .then((response) => response.json())
      .then((data) => setRooms(data));
  }, []);

  const toggleModal = () => {
    setShowCreateRoom(!showCreateRoom);
  }

  const handleCreateRoomInput = (evt) => {
    setRoomName(evt.target.value);
  }

  const createRoom = () => {
    if(roomName) {
      props.onRoomJoinCreate(roomName);
      setShowCreateRoom(!showCreateRoom);
    }
  }

  const handleJoinRoom = (roomName) => {
    props.onRoomJoinCreate(roomName);
  }


    return (
      <>
        <Box sx={{
          maxWidth: '1024px',
          margin: '40px auto'
        }}>
          <Button sx={{
            mb: '20px'
          }} variant="contained"
          onClick={toggleModal}
          >Create New</Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight: 'bold'}}>Rooms</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(rooms).map((room) => (
                  <TableRow
                    key={room?.roomId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell onClick={() => handleJoinRoom(room)} component="th" scope="row">
                      {room}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Modal
          open={showCreateRoom}
          onClose={toggleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            p: '15px'
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a room
            </Typography>
            <Box>
              <Input placeholder={"Room Name"} value={roomName} onChange={handleCreateRoomInput} />
              <Button sx={{
                display: 'block',
                mt: '20px'
              }} variant="contained"
                onClick={createRoom}>
                Create Room
              </Button>
            </Box>
          </Card>
        </Modal>
      </>
    );
  }

  export default RoomSelector;