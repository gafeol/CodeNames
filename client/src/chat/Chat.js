import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import { Button, TextField } from '@material-ui/core'

const ENDPOINT = window.location.href;
const socket = socketIOClient(ENDPOINT);

function Chat (props) {
    var [message, setMessage] = useState("default message");
    var [messageHistory, setHistory] = useState([]);

    const newMessage = (message) => {
        console.log("new message "+ message);
        setHistory([...messageHistory, (<li key={(Math.random()*100000).toFixed(0)}>{message}</li>)]);
    }

    const sendMessage = () => {
        newMessage(message);
        socket.emit('message', message);
    }

    const onFormSubmit = e => {
        e.preventDefault();
        sendMessage();
    }

    useEffect(() => {
        console.log("USE EFFECT ON MESSAGE")
        socket.on('message', ( message ) => { // being set many times
            console.log('new message arrived:' + message);
            newMessage(message);
        });
    });

    return (
        <div>
            <ul>
                { messageHistory }
            </ul>
            <form autoComplete='off' onSubmit={onFormSubmit}>
                <TextField
                    id='message-box'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    name='message'
                />
                <Button
                    type="submit"
                    value="submit"
                    variation="contained">
                    Send
            </Button>
            </form>
        </div>
    );
}

export default Chat;