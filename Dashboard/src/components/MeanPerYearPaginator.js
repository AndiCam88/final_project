import {Pagination} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import React, {useEffect} from "react";
import ChartCard from "./ChartCard"
function Acousticness(){
    return(
        <ChartCard
            title={ 'Acousticness Per Year Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/acousticness_per_year.png"}
            xaxis={'Year'}
            yaxis={'Percentage Value'}
        >
            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
        </ChartCard>
    )
}


function Danceability(){
    return(
        <ChartCard
            title={ 'Danceability Per Year Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/danceability_per_year.png"}
            xaxis={'Year'}
            yaxis={'Percentage Value'}
        >
            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
        </ChartCard>
    )
}

function Energy(){
    return(
        <ChartCard
            title={ 'Energy Per Year Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/energy_per_year.png"}
            xaxis={'Year'}
            yaxis={'Percentage Value'}
        >
            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
        </ChartCard>
    )
}

function Instrumentalness(){
    return(
        <ChartCard
            title={ 'Instrumentalness Per Year Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/instrumentalness_per_year.png"}
            xaxis={'Year'}
            yaxis={'Percentage Value'}
        >
            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
        </ChartCard>
    )
}

function Liveness(){
    return(
        <ChartCard
            title={ 'Liveness Per Year Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/liveness_per_year.png"}
            xaxis={'Year'}
            yaxis={'Percentage Value'}
        >
            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
        </ChartCard>
    )
}


function Loudness(){
    return(
        <ChartCard
            title={ 'Loudness Per Year Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/loudness_per_year.png"}
            yaxis={'Negative(-) Decibles'}
            xaxis={'Year'}
        >
           This chart has been negated for easier reading. A higher number represents a softer/quieter song
        </ChartCard>
    )
}

function Speechiness(){
    return(
        <ChartCard
            title={ 'Speechiness Per Year Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/speechiness_per_year.png"}
            yaxis={'Percentage Value'}
            xaxis={'Year'}
        >
            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
        </ChartCard>
    )
}

function Tempo(){
    return(
        <ChartCard
            title={ 'Tempo Per Year Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/tempo_per_year.png"}
            yaxis={'Beats Per Minute'}
            xaxis={'Year'}
        >
            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
        </ChartCard>
    )
}

function Valence(){
    return(
        <ChartCard
            title={ 'Valence Per Year Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/valence_per_year.png"}
            yaxis={'Percentage Value'}
            xaxis={'Year'}
        >
            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
        </ChartCard>
    )
}


function SongsPerYear(){
    return(
        <ChartCard
            title={ 'Songs Per Year'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/songs_per_year.png"}
            xaxis={'Year'}
            yaxis={'Song Count'}
        >
        </ChartCard>
    )
}


export default function MeanPerYearPaginator(props) {
    const [built, setBuilt] = React.useState(false);
    const [active_number, setActive] = React.useState(1);
    let items = []
    let pagination_list = []
    let current_view = null

    useEffect(() => {
        setActive(1)
    }, [])

    function initialize(){
        var number = 1;

        if(items.length) return


        items.push({
            name: 'acoustic',
            pagination: <Pagination.Item key={number++} onClick={() => update('acoustic')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Acousticness></Acousticness>
        })
        items.push({
            name: 'danceability',
            pagination: <Pagination.Item key={number++} onClick={() => update('danceability')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Danceability></Danceability>
        })
        items.push({
            name: 'energy',
            pagination: <Pagination.Item key={number++} onClick={() => update('energy')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Energy></Energy>
        })

        items.push({
            name: 'instrumental',
            pagination: <Pagination.Item key={number++} onClick={() => update('instrumental')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Instrumentalness></Instrumentalness>
        })

        items.push({
            name: 'liveness',
            pagination: <Pagination.Item key={number++} onClick={() => update('liveness')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Liveness></Liveness>
        })

        items.push({
            name: 'loudness',
            pagination: <Pagination.Item key={number++} onClick={() => update('loudness')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Loudness></Loudness>
        })

        items.push({
            name: 'speechiness',
            pagination: <Pagination.Item key={number++} onClick={() => update('speechiness')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Speechiness></Speechiness>
        })

        items.push({
            name: 'tempo',
            pagination: <Pagination.Item key={number++} onClick={() => update('tempo')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Tempo></Tempo>
        })

        items.push({
            name: 'valence',
            pagination: <Pagination.Item key={number++} onClick={() => update('valence')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Valence></Valence>
        })


        items.push({
            name: 'songs_per_year',
            pagination: <Pagination.Item key={number++} onClick={() => update('songs_per_year')} active={active_number === number}>{number}</Pagination.Item>,
            display: <SongsPerYear></SongsPerYear>
        })


        current_view=items[active_number - 1].display


        items.forEach( i => {
            pagination_list.push(i.pagination)
        })
    }

    function update(e){
        for(var i = 0; i < items.length; i++){
            if(items[i].name == e){
                current_view=items[i].display
                setActive(i+1)
            }
        }
    }

    function prev(){
        if(active_number === 1){
            setActive(items.length )
            current_view=items[active_number - 1].display
            return
        }
        setActive(active_number-1)
        current_view=items[active_number - 1].display
    }

    function next(){
        if(active_number === items.length){
            setActive(1)
            current_view=items[active_number - 1].display
            return
        }
        setActive(active_number+1)
        current_view=items[active_number - 1].display
    }

    initialize()

    // TODO: Fix our height. Probabably should have some sort of dynamic component
    //
    return (
        <div style={{
            display:'flex',
            height:'910px',
            flexDirection:'column',
            justifyContent: 'space-between',
            justifyItems: 'center'}}
        >
            {current_view}

            <Pagination style={{marginLeft:'auto', marginRight:'auto'}}>
                <Pagination.Prev onClick={prev}/>
                {pagination_list}
                <Pagination.Next onClick={next}/>
            </Pagination>
        </div>
    )
}