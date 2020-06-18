import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import './Card.css';
import socketIOClient from 'socket.io-client';

const ENDPOINT = window.location.href;
const socket = socketIOClient(ENDPOINT);

const useStyles = makeStyles({
    strongText: {
        fontSize: "2rem",
        fontWeight: "bold"
    }
});

const Card = ({id, word, updCounter, color, seed, spymaster}) => {
    const classes = useStyles();
    const realClass = 'card ' + color;

    const [hidden, setHidden] = useState(true);

    const revealCard = () => {
        if(hidden){
            setHidden(false);
            console.log(`emits reveal com ${id} ${color}`)
            socket.emit('reveal', {
                'seed': seed,
                'cardId': id
            });
        }
    }

    useEffect(() => {
        setHidden(true);
    }, [word]);

    useEffect(() => {
        socket.on('reveal', ({cardId, seed}) => {
            if(cardId === id)
            setHidden(false);
            updCounter(color);
        })
    });

    if(spymaster){
        return (
            <Fragment>
                {hidden
                    ? <div className={realClass} onClick={revealCard}> <Typography className={classes.strongText} variant="h5"> {word} </Typography> </div>
                    : <div className='card green' onClick={revealCard}> <Typography className={classes.strongText} variant="h5">{word} </Typography> </div>
                }
            </Fragment>
        )
    }
    else {
        return (
            <Fragment>
                {hidden
                    ? <div className='card' onClick={revealCard}> <Typography className={classes.strongText} variant="h5"> {word} </Typography> </div>
                    : <div className={realClass} onClick={revealCard}> <Typography className={classes.strongText} variant="h5">{word} </Typography> </div>
                }
            </Fragment>
        )
    }
}

export default Card;