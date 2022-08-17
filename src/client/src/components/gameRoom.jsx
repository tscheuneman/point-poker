import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const points = ['1', '2', '3', '4', '5', '6'];

const selectedProps = {
    position: 'relative',
    bottom: 40
}

const GameRoom = (props) => {
    const gameState = props?.gameState?.gameState || [];
    const name = props?.name;
    const gameFinished = props?.gameState?.gameStatus === 'complete' || false;


    let endGameState = '';
    if(gameFinished) {
        let val = 0, min = Infinity, max = -Infinity;
        gameState.forEach(elm => { 
            val += parseInt(elm.points);
            if(elm.points > max) {
                max = elm.points;
            }
            if(elm.points < min) {
                min = elm.points;
            }
        });
        endGameState = `Average Points: ${(val / gameState.length)} | Min: ${min} | Max: ${max}`;
    }

    const userGameState = gameState.find(elm => elm.name === name);

    const otherUsers = gameState.filter(elm => elm.name !== name);

    const handleCardClick = (point) => {
        props.onVoteClick(point);
    }

    const handleResetGame = () => {
        props.resetGame();
    }

    return (
      <>
        {
            gameFinished && <>
                <Button sx={{ position: 'absolute', top: 20, right: 20 }} onClick={handleResetGame} variant="contained">
                    Reset Game
                </Button>
            </>
        }
        <Box sx={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            flexFlow: 'wrap',
            columnGap: '15px',
            rowGap: '15px',
        }}>
            {
                otherUsers.map(user => {
                    let extraProps = {};
                    let displayVal = 'Voting...';
                    if(user.points) {
                        displayVal ="Voted";
                    }
                    if(gameFinished) {
                        displayVal = user.points;
                        extraProps = {variant: "h2"};
                    }
                    return (
                        <Box sx={{
                        }}>
                            <Typography sx={{
                                color: '#fff',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }} variant="h6">
                                {user.name}
                            </Typography>

                            <Card elevation={9} sx={{
                            width: '120px',
                            height: '200px',
                        }}>
                            <Typography sx={{
                                textAlign: 'center',
                                textAlign: 'center',
                                lineHeight: '200px'
                            }} variant="body1" { ...extraProps }>
                                {displayVal}
                            </Typography>
                            </Card>
                        </Box>
                    )
                })
            }
        </Box>

        {
            gameFinished && <>
                <Box sx={{
                    marginTop: '30px'
                }}>
                    <Typography sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#fff',
                        textAlign: 'center',
                    }} variant="h5">
                    {endGameState}
                    </Typography>
                </Box>

            </>
        }


        <Box sx={{
            position: 'absolute',
            bottom: '30px',
            width: '100%',
            paddingX: '30px',
            display: 'flex',
            justifyContent: 'center',
            flexFlow: 'wrap',
            columnGap: '15px',
            rowGap: '15px',
        }}>
            {
                points.map(point => {
                    let extraProps = {};
                    if(userGameState.points === point) {
                        extraProps = selectedProps;
                    }
                    return (
                        <Card elevation={9} onClick={() => handleCardClick(point)} sx={{
                            width: '120px',
                            height: '200px',
                            cursor: 'pointer',
                            ...extraProps
                        }}>
                            <Typography sx={{
                                textAlign: 'center',
                                lineHeight: '200px',
                                fontWeight: 'bold'
                            }} variant="h2">
                                { point }
                            </Typography>
                        </Card>
                    )
                })
            }

        </Box>
      </>
    );
  }

  export default GameRoom;