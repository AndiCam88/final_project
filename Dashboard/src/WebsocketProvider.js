import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";


const WebSocket = React.createContext({});

export function WebsocketContextProvider(props){
    //const client = new W3CWebSocket('ws://127.0.0.1:1223');
    const client = new W3CWebSocket('wss://neuralburst.io/musicsocket');
    setInterval(x=>{
        var send_obj = {
            code: -1,
            message: "heartbeat"
        }

        client.send(JSON.stringify(send_obj))
    }, 30000)

    return (
        <WebSocket.Provider value={client}>
            {props.children}
        </WebSocket.Provider>
    )
}

export const useWebsocketContext = () => React.useContext(WebSocket);
