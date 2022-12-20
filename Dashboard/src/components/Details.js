import Carousel from "better-react-carousel";
import React, {useState} from "react";
import VerticalSpacer from "./VerticalSpacer";


function DetailsMeanTable(props){
    return(
        <div className={"detailsTable"}>
            <table style={{textAlign:"left"}}>
                <thead>
                <tr>
                    <td></td>
                    <td className={"detailsTableHeaders"}>Group Mean</td>
                </tr>
                </thead>
                <tbody>
                <tr><td className={"detailsTableHeaders"}>Danceability</td><td className={"detailsTableValues"}>{props.details.Danceability}</td></tr>
                <tr><td className={"detailsTableHeaders"}>Energy</td><td  className={"detailsTableValues"}>{props.details.Energy}</td></tr>
                <tr><td className={"detailsTableHeaders"}>Loudness</td><td  className={"detailsTableValues"}>{props.details.Loudness}</td></tr>
                <tr><td className={"detailsTableHeaders"}>Valence</td><td  className={"detailsTableValues"}>{props.details.Valence}</td></tr>
                <tr><td className={"detailsTableHeaders"}>Tempo</td><td  className={"detailsTableValues"}>{props.details.Tempo}</td></tr>
                <tr><td className={"detailsTableHeaders"}>Acousticness</td><td  className={"detailsTableValues"}>{props.details.Acousticness}</td></tr>
                </tbody>
            </table>
        </div>
    )
}

function LazyLoadFilter(props){
    return(
        <div className={"lazyLoadFilter"}>
            I am a filter
        </div>
    )
}

function LazyLoadTableFrame(props){
    return(
        <div className={"lazyLoadTableFrame"}>
            <div>
                <span className={"lazyColumnTitle"}>Title</span>
                <span className={"lazyColumnArtist"}>Artist</span>
                <span>Danceability</span>
                <span>Energy</span>
                <span>Loudness</span>
                <span>Valence</span>
                <span>Tempo</span>
                <span>Acousticness</span>
                <span>Duration</span>
                <span>Instrumentalness</span>
                <span>Key</span>
                <span>Liveness</span>
                <span>Mode</span>
                <span>Speechiness</span>
                <span>Tempo</span>
                <span>Time Signature</span>
            </div>
        </div>
    )
}
function LazyLoadingTable(props){
    return (
        <div>

        </div>
    );
}

export default function Details(props){
    var img1 = process.env.REACT_APP_BASE_URL + `/result_charts/gp${props.details.id}_danceability.png`
    var img2 = process.env.REACT_APP_BASE_URL + `/result_charts/gp${props.details.id}_energy.png`
    var img3 = process.env.REACT_APP_BASE_URL + `/result_charts/gp${props.details.id}_loudness.png`
    var img4 = process.env.REACT_APP_BASE_URL + `/result_charts/gp${props.details.id}_valence.png`
    var img5 = process.env.REACT_APP_BASE_URL + `/result_charts/gp${props.details.id}_tempo.png`
    var img6 = process.env.REACT_APP_BASE_URL + `/result_charts/gp${props.details.id}_acousticness.png`

    // https://www.npmjs.com/package/better-react-carousel
    return (
        <div>
        <div className={"detailsContainer"}>
            <DetailsMeanTable details={props.details}></DetailsMeanTable>
            <Carousel
                className={"detailsCarousel"}
                cols={3}
                rows={1}
                gap={1}
                loop>
                <Carousel.Item>
                    <img className={"detailsImg"} width="100%" src={img1} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className={"detailsImg"} width="100%"  src={img2} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className={"detailsImg"} width="100%"  src={img3} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className={"detailsImg"} width="100%"  src={img4} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className={"detailsImg"} width="100%"  src={img5} />
                </Carousel.Item>
                <Carousel.Item>
                    <img className={"detailsImg"} width="100%"  src={img6} />
                </Carousel.Item>
            </Carousel>
        </div>
        <LazyLoadingTable></LazyLoadingTable>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
        </div>
    )
}
