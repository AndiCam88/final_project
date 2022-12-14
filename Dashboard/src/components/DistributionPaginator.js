import {Pagination} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import React, {useEffect} from "react";
import ChartCard from "./ChartCard"



function StaticChartAcousticDistribution(){
    return(
        <ChartCard
            title={ 'Acoustic Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/acoustic_distribution.png"}
            xaxis={'Percentage Value'}
            yaxis={'Song Count'}
        >
            This distribution takes on a distinct bathtub curve
        </ChartCard>
    )
}

function StaticChartDanceabilityDistribution(){
    return(
        <ChartCard
            title={ 'Danceability Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/danceability_distribution.png"}
            xaxis={'Percentage Value'}
            yaxis={'Song Count'}
        >
        </ChartCard>
    )
}

function StaticChartEnergyDistribution(){
    return(
        <ChartCard
            title={ 'Energy Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/energy_distribution.png"}
            xaxis={'Percentage Value'}
            yaxis={'Song Count'}
        >
        </ChartCard>
    )
}

function StaticChartInstrumentalDistribution(){
    return(
        <ChartCard
            title={ 'Instrumentalness Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/instrumentalness_distribution.png"}
            xaxis={'Percentage Value'}
            yaxis={'Song Count'}
        >
        </ChartCard>
    )
}

function StaticChartLivenessDistribution(){
    return(
        <ChartCard
            title={ 'Liveness Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/liveness_distribution.png"}
            xaxis={'Percentage Value'}
            yaxis={'Song Count'}
        >
        </ChartCard>
    )
}

function StaticChartLoudnessDistribution(){
    return(
        <ChartCard
            title={ 'Loudness Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/loudness_distribution.png"}
            xaxis={'decibels (dB)'}
            yaxis={'Song Count'}
        >
        </ChartCard>
    )
}

function StaticChartSpeechinessDistribution(){
    return(
        <ChartCard
            title={ 'Speechiness Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/speechiness_distribution.png"}
            xaxis={'Percentage Value'}
            yaxis={'Song Count'}
        >
        </ChartCard>
    )
}

function StaticChartTempoDistribution(){
    return(
        <ChartCard
            title={ 'Tempo Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/tempo_distribution.png"}
            xaxis={'Percentage Value'}
            yaxis={'Song Count'}
        >
        </ChartCard>
    )
}

function StaticChartValenceDistribution(){
    return(
        <ChartCard
            title={ 'Valence Distribution'}
            chart_src={process.env.REACT_APP_BASE_URL + "/staticcharts/valence_distribution.png"}
            xaxis={'Percentage Value'}
            yaxis={'Song Count'}
        >
        </ChartCard>
    )
}



export default function DistributionPaginator(props) {
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
            name: 'acoustic_distribution',
            pagination: <Pagination.Item key={number++} onClick={() => update('acoustic_distribution')} active={active_number === number}>{number}</Pagination.Item>,
            display: <StaticChartAcousticDistribution></StaticChartAcousticDistribution>
        })

        items.push({
            name: 'danceability_distribution',
            pagination: <Pagination.Item key={number++} onClick={() => update('danceability_distribution')} active={active_number === number}>{number}</Pagination.Item>,
            display: <StaticChartDanceabilityDistribution></StaticChartDanceabilityDistribution>
        })

        items.push({
            name: 'energy',
            pagination: <Pagination.Item key={number++} onClick={() => update('energy')} active={active_number === number}>{number}</Pagination.Item>,
            display: <StaticChartEnergyDistribution></StaticChartEnergyDistribution>
        })

        items.push({
            name: 'instrumental',
            pagination: <Pagination.Item key={number++} onClick={() => update('instrumental')} active={active_number === number}>{number}</Pagination.Item>,
            display: <StaticChartInstrumentalDistribution></StaticChartInstrumentalDistribution>
        })

        items.push({
            name: 'liveness',
            pagination: <Pagination.Item key={number++} onClick={() => update('liveness')} active={active_number === number}>{number}</Pagination.Item>,
            display: <StaticChartLivenessDistribution></StaticChartLivenessDistribution>
        })

        items.push({
            name: 'loudness',
            pagination: <Pagination.Item key={number++} onClick={() => update('loudness')} active={active_number === number}>{number}</Pagination.Item>,
            display: <StaticChartLoudnessDistribution></StaticChartLoudnessDistribution>
        })

        items.push({
            name: 'speechiness',
            pagination: <Pagination.Item key={number++} onClick={() => update('speechiness')} active={active_number === number}>{number}</Pagination.Item>,
            display: <StaticChartSpeechinessDistribution></StaticChartSpeechinessDistribution>
        })

        items.push({
            name: 'tempo',
            pagination: <Pagination.Item key={number++} onClick={() => update('tempo')} active={active_number === number}>{number}</Pagination.Item>,
            display: <StaticChartTempoDistribution></StaticChartTempoDistribution>
        })

        items.push({
            name: 'valence',
            pagination: <Pagination.Item key={number++} onClick={() => update('valence')} active={active_number === number}>{number}</Pagination.Item>,
            display: <StaticChartValenceDistribution></StaticChartValenceDistribution>
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

    // TODO: Fix our height. Probably should have some sort of dynamic component
    //
    return (
        <div style={{
            display:'flex',
            height:'900px',
            marginBottom:'5em',
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