import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import './Card.css';

const useStyles = makeStyles({
    strongText: {
        fontSize: "2rem",
        fontWeight: "bold"
    }
});

const Card = ({word, reveal, color}) => {
    const classes = useStyles();
    const realClass = 'card ' + color;

    const [hidden, setHidden] = useState(true);

    const revealCard = () => {
        if(hidden){
            setHidden(false);
            reveal(color);
        }
    }

    useEffect(() => {
        setHidden(true);
    }, [word]);

    return (
        <Fragment>
            {hidden 
                ? <div className='card' onClick={revealCard}> <Typography className={classes.strongText} variant="h5"> {word} </Typography> </div>
                : <div className={realClass} onClick={revealCard}> <Typography className={classes.strongText} variant="h5">{word} </Typography> </div>
            }
       </Fragment>
    )
}

export default Card;