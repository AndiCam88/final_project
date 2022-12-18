import {Pagination} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import React, {useEffect} from "react";
import ChartCard from "./ChartCard"


function ChartCard2(props){
    return(
        <Card fluid="sm" >
            <Card.Title>{props.title}</Card.Title>
            <div className={"chartframe"} >
                <div className={'chartframeinner'}>
                    <img alt={props.title} style={{width:'100%'}} src={props.chart_src}/>
                </div>
            </div>
            <Card.Body>
                {props.children}
            </Card.Body>
        </Card>
    )
}



function Group1(){
    return(
        <ChartCard2
            title={ 'Group 1'}
            chart_src={process.env.REACT_APP_BASE_URL + "/sample_results/group1.png"}
        >
        </ChartCard2>
    )
}

function Group2(){
    return(
        <ChartCard2
            title={ 'Group 2'}
            chart_src={process.env.REACT_APP_BASE_URL + "/sample_results/group2.png"}
        >
        </ChartCard2>
    )
}

function Group3(){
    return(
        <ChartCard2
            title={ 'Group 3'}
            chart_src={process.env.REACT_APP_BASE_URL + "/sample_results/group3.png"}
        >
        </ChartCard2>
    )
}

function Group4(){
    return(
        <ChartCard2
            title={ 'Group 4'}
            chart_src={process.env.REACT_APP_BASE_URL + "/sample_results/group4.png"}
        >
        </ChartCard2>
    )
}


export default function SampleResultsPaginator(props) {
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
            name: 'group1',
            pagination: <Pagination.Item key={number++} onClick={() => update('group1')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Group1></Group1>
        })

        items.push({
            name: 'group2',
            pagination: <Pagination.Item key={number++} onClick={() => update('group2')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Group2></Group2>
        })

        items.push({
            name: 'group3',
            pagination: <Pagination.Item key={number++} onClick={() => update('group3')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Group3></Group3>
        })

        items.push({
            name: 'group4',
            pagination: <Pagination.Item key={number++} onClick={() => update('group4')} active={active_number === number}>{number}</Pagination.Item>,
            display: <Group4></Group4>
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
            height:'576px',
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