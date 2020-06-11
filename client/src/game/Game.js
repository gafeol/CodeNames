import React, {useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Card from './Card.js';
import './Game.css';

const Game = (props) => {
    var cardList = [];
    var [seed, setSeed] = useState(0);
    var [redWords, setRedWords] = useState(9);
    var [blueWords, setBlueWords] = useState(8);
    var random;

    const makeRandomGen = () => {
        const hash = (x) => {
            var h = 0;
            for(var i=0;i<x.length;i++){
                h *= 1000000007;
                h += x.charCodeAt(i);
                h %= 1000000009;
            }
            return h;
        }

        var auxSeed = hash(JSON.stringify(seed));
        return () => {
            var x = Math.sin(auxSeed) * 10000;
            auxSeed++;
            auxSeed *= 3;
            auxSeed %= 1000000009;
            return x - Math.floor(x);
        }
    }

    const handleReveal = (color) => {
        if(color === 'red'){
            setRedWords(redWords-1);
        }
        else{
            setBlueWords(blueWords-1);
        }
    }

    for (let i = 0; i < 25; i++) {
        cardList.push(<Card key={i} color='red' reveal={handleReveal}/>)
    }

    useEffect(() => {
        random = makeRandomGen();
        console.log("Seed eh "+seed);
        //so usar com random() agora
    }, [seed])

    return (
        <div className="game">
            <h1> CodeNames </h1>
            <div class="stats-bar">
                <p> Red team words: {redWords}</p>
                <p> Blue team words: {blueWords}</p>
                <TextField placeholder="seed" 
                    value={seed}
                    onChange={e => setSeed(e.target.value)}/>
            </div>
            <div className="board">
                {cardList}
            </div>
        </div>
    )
}

export default Game;