import Card from "react-bootstrap/Card";
import {Pagination} from "react-bootstrap";
import React, {useEffect} from "react";
import TemplateFactory from "bootstrap/js/src/util/template-factory";
import MeanPerYearPaginator from "./components/MeanPerYearPaginator"
import DistributionPaginator from "./components/DistributionPaginator"
import VerticalSpacer from "./components/VerticalSpacer";

function Filter(){
    return(
    <div>
        <input placeholder={"Enter a song name"}></input>
    </div>)
}

function SimpleResults(){
    return(
        <div>
            <VerticalSpacer></VerticalSpacer>
            <Filter></Filter>
            <h1>[Mood Result Goes Here]</h1>
            <VerticalSpacer></VerticalSpacer>
        </div>
    )
}

export default function ExplorePage(){
    return(
        <div>
            <SimpleResults></SimpleResults>
            <DistributionPaginator></DistributionPaginator>
            <MeanPerYearPaginator></MeanPerYearPaginator>
        </div>
    )
}
