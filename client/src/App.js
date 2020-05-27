import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

function App() {
  var username = useState("");

  useEffect(() => {
    // Testing API request
    fetch('/api/test')
      .then(res => res.json()) // Gets only the json from the response
      .then(({answer}) => console.log(answer));
    const ENDPOINT = 'http://localhost:5000';
    const socket = socketIOClient(ENDPOINT);

    socket.on('user joined', data => {
      console.log("a new user has joined!");
    });
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
