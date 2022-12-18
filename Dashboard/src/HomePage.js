import VerticalSpacer from "./components/VerticalSpacer";
import {useEffect} from "react";
import axios from "axios";
import React from "react";
import GaugeChart from 'react-gauge-chart'
import { ReactSearchAutocomplete } from 'react-search-autocomplete' // https://www.npmjs.com/package/react-search-autocomplete

// import ReactMarkdown from "react-markdown";
// import remarkGfm from 'remark-gfm'

function Filter(){
    const [items, setItems] = React.useState([]);
    const auto_suggest_url="http://localhost:8080/getsuggestions"
    var current_search_string = ""
    var current_results = []

    useEffect(() => {
        document.addEventListener('keypress', detectKeyPress, false)

        return () => {
            window.removeEventListener('keypress', detectKeyPress);
        };
    })

    function handleOnSearch(string, results){
        current_search_string = string
        current_results = results

        console.log(results)
        axios.get(auto_suggest_url).then( res =>{
            if(res.status === 200){
                setItems(res.data)
            }
        })
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
    }

    const formatResult = (item) => {
        return (
            <>
                {item.name}
            </>
        )
    }

    const detectKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter pressed! ', current_search_string)
        }
    }

    // https://www.npmjs.com/package/react-search-autocomplete
    return(
        <div style={{width:'50%', marginLeft:'auto', marginRight:'auto'}}>
            <ReactSearchAutocomplete
                placeholder={'Enter a song name here'}
                items={items}
                onSearch={handleOnSearch}
                // onHover={handleOnHover}
                onSelect={handleOnSelect}
                // onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
            />
        </div>)
}


function SimpleResults(props){
    var group_number = 3;

    function group_enum(val){
        val = parseInt(val)

        if(val === 0) return 'Sad'
        if(val === 1) return 'Calm'
        if(val === 2) return 'Energetic'
        if(val === 3) return 'Happy'
        if(val === 5) return ''
    }

    // const color_group0 = '#02989A'
    // const color_group1 = '#1241AA'
    // const color_group2 = '#3914B0'
    // const color_group3 = '#7308B0'

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
            <Filter></Filter>
        </div>
    )
}




export default function HomePage(){
    //const [markdown, setMarkdown] = React.useState("");

    //const markdown_link = 'https://raw.githubusercontent.com/AndiCam88/final_project/main/README.md'

    useEffect(() => {

        //var p = axios.get(markdown_link);
        //p.then( res =>{
        //   setMarkdown(res.data)
        //})

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
