import React, {useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Card from './Card.js';
import './Game.css';
import getWordAt from './Dictionary.js';
import socketIOClient from 'socket.io-client';

const Game = () => {
    var [cardList, setCardList] = useState([]);
    var [seed, setSeed] = useState(0);
    var [redWords, setRedWords] = useState(9);
    var [blueWords, setBlueWords] = useState(8);
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

    const updCounter = (colorRevealed) => {
        if (colorRevealed === 'red') {
            setRedWords(redWords - 1);
        }
        else {
            setBlueWords(blueWords - 1);
        }
    }

    const shuffleMask = (random) => {
        var mask = [
            'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
            'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
            'bomb',
            'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral',
        ];
        // shuffle
        for(var i=0;i<mask.length-1;i++){
            var j = random()%(mask.length - i);
            [mask[i], mask[j]] = [mask[j], mask[i]];
        }
        return mask;
    }

    useEffect(() => {
        var random = makeRandomGen(10000000, true);
        var mask = shuffleMask(random);
        var wordList = []
        var newCardList = [];
        for (let i = 0; i < 25; i++) {
            var word = getWordAt(random());
            while(wordList.includes(word))
                word = getWordAt(random());
            newCardList.push(<Card key={i} id={i} word={word} color={mask[i]} updCounter={updCounter} seed={seed}/>)
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