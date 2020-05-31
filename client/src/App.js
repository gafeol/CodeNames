import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Chat from './Chat.js'
import './App.css';

function App() {
  const ENDPOINT = window.location.href;
  const socket = socketIOClient(ENDPOINT);
  useEffect(() => {
    socket.on('user joined', data => {
      console.log("a new user has joined!");
    });
  });
  return (
    <div className="App">
      <h1> CodeName </h1>
      <Chat/>
    </div>
  );
}

export default App;
