import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

function Chat({ location }) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);


    const ENDPOINT = 'https://chat-app-nodereact.herokuapp.com/';
    // const ENDPOINT = 'http://localhost:5000'

    // useeffect for joining and disconnecting
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {

        });

        //during unmounting
        return () => {
            socket.emit('close');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages, users]);

    const sendMessage = event => {
        event.preventDefault();
        console.log("::"+message);
        if (message) {
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }
    }

    
    const onDrop = (files) => {
        const data = files[0];

        var reader = new FileReader();
        reader.onload = function(event){
            var msg ={};
            // msg.username = username;
            msg.file = event.target.result;
            msg.fileName = data.name;
            socket.emit('sendMessage', msg, ()=> setMessage(''));
        };
        reader.readAsDataURL(data);
        console.log(reader);
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} onDrop={onDrop} />
            </div>
        </div>
    );
};

export default Chat;