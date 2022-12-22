import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";


const WebSocket = React.createContext({});

// TODO: Setup some callback stuff for this
export function WebsocketContextProvider(props){
    class ClassWS{
        callbacks = {}
        timeoutStack = 0

        constructor() {
            // this.client= new W3CWebSocket('ws://127.0.0.1:1223');
            this.client = new W3CWebSocket('wss://neuralburst.io/musicsocket');
            this.client.onmessage = (message) => {

                const myObj =  JSON.parse(message.data);
                if( myObj != null){
                    var cbfunc = this.callbacks[myObj.code]
                    if(cbfunc !== undefined){
                        const msgObj = JSON.parse(myObj.obj);
                        cbfunc(msgObj)
                    }
                }
            };
        };

        setCallback(code, cbfunc){
            this.callbacks[code] = cbfunc
        };

        sendMessage(code, obj){
            if(this.client.readyState !== 1) {
                this.timeoutStack += 1

                if(this.timeoutStack > 10){
                    // Handle error
                    return
                }

                setTimeout( () => {this.sendMessage(code,obj)}, 250 + (1000*(this.timeoutStack - 1)))
                return
            }

            const message = JSON.stringify(obj)
            let send_obj = {
                code: code,
                message: message
            }

            this.client.send(JSON.stringify(send_obj))
        };

    };

    var ws = new ClassWS();


    setInterval(x=>{
        var send_obj = {
            code: -1,
            message: "heartbeat"
        }

        ws.client.send(JSON.stringify(send_obj))
    }, 30000)

    return (
        <WebSocket.Provider value={ws}>
            {props.children}
        </WebSocket.Provider>
    )
}

export const useWebsocketContext = () => React.useContext(WebSocket);
