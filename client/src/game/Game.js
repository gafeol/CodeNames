import React from 'react';
import Card from './Card.js';
import './Game.css';

const Game = (props) => {
    var cardList = [];

    for (let i = 0; i < 25; i++) {
        cardList.push(<Card />)
    }

    return (
        <div class="game">
            <h1> CodeNames </h1>
            <div class="board">
                {cardList}
            </div>
        </div>
    )
}

export default Game;