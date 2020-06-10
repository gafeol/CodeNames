import React, { useState, Fragment } from 'react';
import './Card.css';

const Card = ({reveal, color}) => {
    const realClass = 'card ' + color;

    const [hidden, setHidden] = useState(true);

    const revealCard = () => {
        if(hidden){
            setHidden(false);
            reveal(color);
        }
    }

    return (
        <Fragment>
            {hidden 
                ? <div className='card' onClick={revealCard}> <p> card </p> </div>
                : <div className={realClass} onClick={revealCard}> <p> card </p> </div>
            }
       </Fragment>
    )
}

export default Card;