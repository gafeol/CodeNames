import React, {useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Card from './Card.js';
import './Game.css';
import getWordAt from './Dictionary.js';

const Game = (props) => {
    var [cardList, setCardList] = useState([]);
    var [seed, setSeed] = useState(0);
    var [redWords, setRedWords] = useState(9);
    var [blueWords, setBlueWords] = useState(8);
    var random;

    const makeRandomGen = (upperLimit = 1, onlyInt = false) => {
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
            var rndBase = x - Math.floor(x); // 0 - 1 value
            rndBase *= upperLimit;
            if(onlyInt)
                rndBase = Math.floor(rndBase);
            return rndBase;
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

    useEffect(() => {
        random = makeRandomGen(10000000, true);
        var wordList = []
        var newCardList = [];
        for (let i = 0; i < 25; i++) {
            var word = getWordAt(random());
            while(wordList.includes(word))
                word = getWordAt(random());

            newCardList.push(<Card key={i} word={word} color='red' reveal={handleReveal} />)
        }
        setCardList(newCardList);
    }, [seed])

    return (
        <div className="game">
            <h1> CodeNames </h1>
            <div className="stats-bar">
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