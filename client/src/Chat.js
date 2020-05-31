import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import { Button, TextField } from '@material-ui/core'

function Chat (props) {
    var [message, setMessage] = useState("mensagem padrao");
    const ENDPOINT = window.location.href;
    const socket = socketIOClient(ENDPOINT);

    useEffect(() => {
        socket.on('message', ({ message }) => {
            console.log('new message arrived:' + message);
            setMessage(message)
        });
    });

    function sendMessage() {
        socket.emit('message', message);
    }
    return (
        <div>
            <p>
                {message}
            </p>
            <form autoComplete='off'>
                <TextField
                    id='message-box'
                    name='message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <Button
                    onClick={sendMessage}
                    variation="contained">
                    Send
            </Button>
            </form>
        </div>
    );
}

export default Chat;