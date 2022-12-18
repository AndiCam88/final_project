import VerticalSpacer from "./components/VerticalSpacer";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import {useEffect} from "react";
import axios from "axios";
import React from "react";
import GaugeChart from 'react-gauge-chart'
import { ReactSearchAutocomplete } from 'react-search-autocomplete' // https://www.npmjs.com/package/react-search-autocomplete

function Filter(){
    return(
        <div style={{width:'50%', marginLeft:'auto', marginRight:'auto'}}>
            {/*<input style={{width:'50%'}} placeholder={"Enter a song name"}></input>*/}
            <ReactSearchAutocomplete
                placeholder={'Enter a song name here'}
                // items={items}
                // onSearch={handleOnSearch}
                // onHover={handleOnHover}
                // onSelect={handleOnSelect}
                // onFocus={handleOnFocus}
                autoFocus
                // formatResult={formatResult}
            />
        </div>)
}


function SimpleResults(){
    var group_number = 2;

    function group_enum(val){
        val = parseInt(val)

        if(val === 0) return 'Sad'
        if(val === 1) return 'Calm'
        if(val === 2) return 'Energetic'
        if(val === 3) return 'Happy'
        if(val === 5) return ''
    }
    function group_number_to_guagevalue(val){
        return val * .25 + .125
    }

    let group_name = group_enum(group_number)
    let guage=(
        <GaugeChart
            nrOfLevels={4}
            formatTextValue={ x=> ''}
            percent={0}
            id="gauge-chart1" />
    )

    if(group_name != ''){
        guage=(
            <GaugeChart
                nrOfLevels={4}
                textColor={'#212529'}
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
            <Filter></Filter>
        </div>
    )
}




export default function HomePage(){
    const [markdown, setMarkdown] = React.useState("");

    const markdown_link = 'https://raw.githubusercontent.com/AndiCam88/final_project/main/README.md'

    useEffect(() => {

        var p = axios.get(markdown_link);
        p.then( res =>{
            setMarkdown(res.data)
        })

    }, [])

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
