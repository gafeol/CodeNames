import React from 'react';
import Card from './Card.js';
import './Game.css';

const Game = (props) => {
    var cardList = [];

    for (let i = 0; i < 25; i++) {
        cardList.push(<Card key={i}/>)
    }

    return (
        <div className="game">
            <h1> CodeNames </h1>
            <div className="board">
                {cardList}
            </div>
        </div>
    )
}

export default Game;