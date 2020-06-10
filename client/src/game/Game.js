import React, {useState} from 'react';
import { TextField } from '@material-ui/core';
import Card from './Card.js';
import './Game.css';

const Game = (props) => {
    var cardList = [];
    var [seed, setSeed] = useState('');


    function random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    const handleReveal = (color) => {
    }

    for (let i = 0; i < 25; i++) {
        cardList.push(<Card key={i} color='red' reveal={handleReveal}/>)
    }

    return (
        <div className="game">
            <h1> CodeNames </h1>
            <TextField placeholder="seed"/>
            <div className="board">
                {cardList}
            </div>
        </div>
    )
}

export default Game;