import VerticalSpacer from "./components/VerticalSpacer";
import {useCallback, useEffect, useRef} from "react";
import axios from "axios";
import React from "react";
import GaugeChart from 'react-gauge-chart'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'// https://www.npmjs.com/package/react-search-autocomplete
import { w3cwebsocket as W3CWebSocket } from "websocket";

// TODO: Move this connection into the main app. There are a couple of places we want to keep it.
const client = new W3CWebSocket('ws://127.0.0.1:1223');


function Filter(props){
    const [items, setItems] = React.useState([]);

    useEffect(() => {

        client.onmessage = (message) => {
            var myObj =  JSON.parse(message.data);
            if( myObj != null){
                if(myObj.code === 0){
                    if( myObj.list != null && myObj.list.length > 0) {
                        setItems(myObj.list)
                    }
                }
                else if(myObj.code === 1){
                    props.updateCallback(myObj.group)
                }
            }

        };
    }, [])

    async function handleOnSearch(string, results){

        var message = JSON.stringify({
            title: string
        })
        var send_obj = {
            code: 0,
            message: message
        }

        // TODO: Handle dead websocket
        client.send(JSON.stringify(send_obj))
    }

    const handleOnSelect = (item) => {
        var message = JSON.stringify({
            id: item.id
        })
        var send_obj = {
            code: 1,
            message: message
        }

        // TODO: Handle dead websocket
        client.send(JSON.stringify(send_obj))

    }

    const formatResult = (item) => {
        return (
            <>
                {item.name}
            </>
        )
    }

    return(
        <div style={{width:'50%', marginLeft:'auto', marginRight:'auto'}}>
            <ReactSearchAutocomplete
                placeholder={'Enter a song name here'}
                items={items}
                inputDebounce={150}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                //onClear={props.updateCallback(5)}
                autoFocus
                //formatResult={formatResult}
            />
        </div>)
}


function SimpleResults(props){
    const [group_number, setGroup] = React.useState(5);

    function group_enum(val){
        val = parseInt(val)

        if(val === 0) return 'Sad'
        if(val === 1) return 'Calm'
        if(val === 2) return 'Energetic'
        if(val === 3) return 'Happy'
        if(val === 5) return ''
    }


    const color_group0 = '#02329a'
    const color_group1 = '#45aa12'
    const color_group2 = '#e1c800'
    const color_group3 = '#FF6D28'
    var text_color = '#212529'

    if(group_number === 0) text_color = color_group0;
    if(group_number === 1) text_color = color_group1;
    if(group_number === 2) text_color = color_group2;
    if(group_number === 3) text_color = color_group3;

    function group_number_to_guagevalue(val){
        return val * .25 + .125
    }

    // Customization of the gauge can be found https://www.npmjs.com/package/react-gauge-chart
    let group_name = group_enum(group_number)
    let guage=(
        <GaugeChart
            nrOfLevels={4}
            colors={[color_group0, color_group1, color_group2, color_group3]}
            formatTextValue={ x=> ''}
            percent={0}
            id="gauge-chart1" />
    )

    if(group_name !== ''){
        guage=(
            <GaugeChart
                nrOfLevels={4}
                textColor={text_color}
                colors={[color_group0, color_group1, color_group2, color_group3]}
                formatTextValue={ x=> group_name}
                percent={group_number_to_guagevalue(group_number)}
                id="gauge-chart1" />
        )
    }

    return(
        <div>
            <div>
                Enter a name of a song in the field below. The resulting output is read from a pre-run classifier. This
                classifier attempts to separate songs based on quantifiable features from the Spotify API into different groups.
            </div>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            {guage}
            <Filter updateCallback={x => setGroup(x)}></Filter>
        </div>
    )
}

function TestWS (){
    const client = new W3CWebSocket('ws://127.0.0.1:1223');

    useEffect(() => {

        client.onopen = () => {
            console.log('WebSocket Client Connected');
            var message = JSON.stringify({
                title: "hello"
            })
            var send_obj = {
                code: 0,
                message: message
            }

            console.log(send_obj)


            client.send(JSON.stringify(send_obj))
        };

        client.onmessage = (message) => {
            var myObj =  JSON.parse(message.data);
            console.log(myObj);
        };



    }, [])

    return(
        <div>
            Websocket Test component
        </div>
    )
}



export default function HomePage(){

    return(
        <div>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <h1>Welcome to our music feature classifier</h1>
            <SimpleResults></SimpleResults>

            {/*<ReactMarkdown className={'alignLeft'} children={markdown} remarkPlugins={[remarkGfm]} />*/}
        </div>
    )
}
