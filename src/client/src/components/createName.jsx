import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


const NameCreator = (props) => {
    const [userName, setUserName] = useState('');

    const handleUserInput = (evt) => {
        setUserName(evt.target.value);
    }

    return (
      <>
        <Card sx={{
          maxWidth: '1024px',
          margin: '40px auto',
          padding: '20px'
        }}>
            <Typography id="nameName" variant="h6" component="h2">
                What is your name?
            </Typography>
            <Input sx={{ display: 'block' }} placeholder={"User Name"} value={userName} onChange={handleUserInput} />
              <Button sx={{
                display: 'block',
                mt: '20px'
              }} variant="contained"
                onClick={() => props.userLogin(userName)}>
                Continue
              </Button>
        </Card>
      </>
    );
  }

  export default NameCreator;