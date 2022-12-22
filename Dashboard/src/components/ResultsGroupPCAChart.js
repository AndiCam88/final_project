import React from "react";
import Details from "./Details";
import PCAGroup from "./Groups/PCAGroup";
import SongTable from "./SongTable";
import VerticalSpacer from "./VerticalSpacer";

export const group1={
    id: 0,
    Danceability:      0.505736,
    Energy:            0.276662,
    Loudness:        -14.776704,
    Valence:           0.394077,
    Tempo:           115.183930,
    Acousticness:      0.839595,
}

export const group2={
    id: 1,
    Danceability:      0.609873,
    Energy:            0.542102,
    Loudness:        -10.065601,
    Valence:           0.728848,
    Tempo:           120.370788,
    Acousticness:      0.653435,
}

export const group3={
    id: 2,
    Danceability:      0.639074,
    Energy:            0.739290,
    Loudness:         -7.452467,
    Valence:           0.719225,
    Tempo:           123.138120,
    Acousticness:      0.106826,
}

export const group4={
    id: 3,
    Danceability:       0.278780,
    Energy:             0.123991,
    Loudness:         -21.588857,
    Valence:            0.122366,
    Tempo:            101.104810,
    Acousticness:       0.916927,
}

export const group5={
    id: 4,
    Danceability:      0.409994,
    Energy:            0.856784,
    Loudness:         -6.264466,
    Valence:           0.318504,
    Tempo:           129.705282,
    Acousticness:      0.036786,
}

export const group6={
    id: 5,
    Danceability:       0.521134,
    Energy:             0.476595,
    Loudness:           -10.710137,
    Valence:            0.272742,
    Tempo:              116.271813,
    Acousticness:       0.223071,
}

export default function ResultsGroupGraph(props){
    const [activeItem, setActiveItem] = React.useState(((typeof props.staticItem === "number" )? props.staticItem : -1));
    const [hovered_item, setHoverItem] = React.useState( -1);
    //var hovered_item = -1

    var group_list = [group1, group2, group3, group4, group5, group6]

    function mouseEnterCallback(group){
        setHoverItem(group)
        if(props.CaptureHoverEvents){
            setActiveItem(group)
        }

    }

    function mouseLeaveCallback(group){
        if(activeItem === group){
            setHoverItem(-1)
            if(props.CaptureHoverEvents){
                setActiveItem(-1)
            }
        }
    }

    function mouseClickCallback(group){
        if(!props.CaptureClickEvents ) return
        if(activeItem !== hovered_item)
        {
            setActiveItem(group)
        }
        else {
            setActiveItem(-1)
        }

    }

    function checkToClear(){
        if(hovered_item === activeItem && props.CaptureClickEvents)
            setActiveItem(-1)
    }

    var details = (<div></div>)

    if(activeItem > 0){
        details = (<Details details={group_list[activeItem-1]}></Details>)
    }

    var PCAList = []
    for(var i = 1; i <= 6; i++ ){
        PCAList.push(
            <PCAGroup
                key={i}
                id={i}
                active={activeItem === i}
                minimized={activeItem !== i && activeItem !== -1}
                mouseClickCallback={(g=>mouseClickCallback(g))}
                mouseEnterCallback={(g=>mouseEnterCallback(g))}
                mouseLeaveCallback={(g=>mouseLeaveCallback(g))}/>
        )
    }

    return(
        <div>
            <div onClick={() => checkToClear()}>
                <div className={"svgcontainer"}>
                    {PCAList}
                </div>
            </div>
            {details}
            <SongTable groupfilter={activeItem} rowsPerPage={20}></SongTable>
            <VerticalSpacer></VerticalSpacer>
        </div>
    )
}
