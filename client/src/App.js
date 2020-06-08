import React from 'react';
import Chat from './chat/Chat.js'
import Game from './game/Game.js'
import './App.css';

function App() {
  return (
    <div className="body">
      <Game />
      <Chat />
    </div>
  );
}

export default App;
