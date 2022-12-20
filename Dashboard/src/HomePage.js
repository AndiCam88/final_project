import VerticalSpacer from "./components/VerticalSpacer";
import {useCallback, useContext, useEffect, useRef} from "react";
import axios from "axios";
import React from "react";
import GaugeChart from 'react-gauge-chart'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'// https://www.npmjs.com/package/react-search-autocomplete
import ResultsGroupGraph from "./components/ResultsGroupPCAChart";
import {useWebsocketContext} from "./WebsocketProvider";



function Filter(props){
    const [items, setItems] = React.useState([]);
    const client = useWebsocketContext();

    useEffect(() => {

        client.onmessage = (message) => {
            const myObj =  JSON.parse(message.data);
            if( myObj != null){
                if(myObj.code === 0){
                    if( myObj.list != null && myObj.list.length > 0) {
                        setItems(myObj.list)
                    }
                }
                else if(myObj.code === 1){
                    props.updateCallback(myObj.group + 1)
                }
            }

        };
    }, [])

    async function handleOnSearch(string, results){

        const message = JSON.stringify({
            title: string
        })
        let send_obj = {
            code: 0,
            message: message
        }

        // TODO: Handle dead websocket
        client.send(JSON.stringify(send_obj))
    }

    const handleOnSelect = (item) => {
        const message = JSON.stringify({
            id: item.index
        })
        let send_obj = {
            code: 1,
            message: message
        }

        // TODO: Handle dead websocket
        client.send(JSON.stringify(send_obj))

    }

    const formatResult = (item) => {
        let artists = item.artists.replace('[', '')
        artists = artists.replace(']', '')
        return (
            <>
                <span>{item.name} ({artists})</span>
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
                onClear={() => props.updateCallback(-1)}
                autoFocus
                formatResult={formatResult}
            />
        </div>)
}


function SimpleResults(props){
    const [group_number, setGroup] = React.useState(-1);

    function group_enum(val){
        val = parseInt(val)

        if(val === 1) return 'Group 1'
        if(val === 2) return 'Group 2'
        if(val === 3) return 'Group 3'
        if(val === 4) return 'Group 4'
        if(val === 5) return 'Group 5'
        if(val === 6) return 'Group 6'
        if(val === -1) return ''
    }


    // const color_group0 = '#02329a'
    // const color_group1 = '#45aa12'
    // const color_group2 = '#e1c800'
    // const color_group3 = '#FF6D28'
    const color_group0 = 'red'
    const color_group1 = 'orange'
    const color_group2 = 'blue'
    const color_group3 = 'purple'
    const color_group4 = 'green'
    const color_group5 = 'brown'
    var text_color = '#212529'

    if(group_number === 1) text_color = color_group0;
    if(group_number === 2) text_color = color_group1;
    if(group_number === 3) text_color = color_group2;
    if(group_number === 4) text_color = color_group3;
    if(group_number === 5) text_color = color_group4;
    if(group_number === 6) text_color = color_group5;

    function group_number_to_guagevalue(val){
        val -=1
        const ngroups = 6
        return val * (25.0/ngroups) + (12.5/ngroups)
    }

    // Customization of the gauge can be found https://www.npmjs.com/package/react-gauge-chart
    let group_name = group_enum(group_number)
    let guage=(
        <GaugeChart
            nrOfLevels={6}
            colors={[color_group0, color_group1, color_group2, color_group3, color_group4, color_group5]}
            formatTextValue={ x=> ''}
            percent={0}
            id="gauge-chart1" />
    )

    if(group_name !== ''){
        guage=(
            <GaugeChart
                nrOfLevels={6}
                textColor={text_color}
                colors={[color_group0, color_group1, color_group2, color_group3, color_group4, color_group5]}
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




export default function HomePage(){

    return(
        <div>

            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <h1>Welcome to our music feature classifier</h1>
            <SimpleResults></SimpleResults>

            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <div>
                <VerticalSpacer></VerticalSpacer>
                <h3>Or explore the grouping details</h3>
                <VerticalSpacer></VerticalSpacer>
                <hr/>
                This graph is a 2D representation of the seperated groups. Click on a group for details about the
                classification.

            </div>

            <ResultsGroupGraph CaptureClickEvents></ResultsGroupGraph>
        </div>
    )
}
