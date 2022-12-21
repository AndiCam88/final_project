import React, {useEffect, useRef} from "react";
import {useWebsocketContext} from "../WebsocketProvider";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import GaugeChart from 'react-gauge-chart'
import VerticalSpacer from "./VerticalSpacer";
import mapname from "./Groupnames";


function Filter(props){
    const [items, setItems] = React.useState([]);
    const [title_search, setTitleSearch] = React.useState("");
    const ws = useWebsocketContext();


    useEffect(() => {

        ws.setCallback(0, obj=>{
            if( obj.list != null && obj.list.length > 0) {
                setItems(obj.list)
            }
        })

        ws.setCallback(1, obj=>{
            props.updateCallback(obj.group + 1)
        })

    }, [])

    async function handleOnSearch(string, results){
        var artist_search = ""
        var temp_title = string
        if(string.indexOf(',') > -1){
            artist_search =  string.substring(string.indexOf(',') + 1, string.length).trim()
            temp_title = string.substring(0, string.indexOf(',')).trim()
        }

        ws.sendMessage( 0,{
            title: temp_title,
            artist: artist_search
        })

        setTitleSearch(temp_title)
    }

    const handleOnSelect = (item) => {
        ws.sendMessage( 1,{
            id: item.index
        })

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
                inputSearchString={title_search}
                fuseOptions={{ keys: ["name", "artists"] }}
            />
        </div>)
}


export default function SimpleResults(props){
    const [group_number, setGroup] = React.useState(-1);


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
    let group_name = mapname(group_number - 1)
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
