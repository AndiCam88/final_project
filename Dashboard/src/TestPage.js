import React, {useRef} from "react";
import { useEffect } from 'react'
import VerticalSpacer from "./components/VerticalSpacer";
import ClientRow from "./components/ClientRow";
import SongSearchWidget from "./components/SongSearchWidget";
import FilterComponentWidget from "./components/FilterWidget";
import Plot from 'react-plotly.js';
import axios from "axios";
import Dexie from 'dexie'
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import {Alert, ProgressBar} from "react-bootstrap";



function TestPlot(){
    return (
        <Plot className={"DebugBorder4"}
            data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
                {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
            ]}
            layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
        />
    );
}

function DataLoader(){
    const [percent_imported, set_percent_imported] = React.useState(0);
    const [percent_downloaded, set_percent_downloaded] = React.useState(0);
    const chunk_fetcher_url = 'http://192.168.1.118:8080/test'
    const database_len_url = `http://192.168.1.118:8080/totalrowcount`
    const [elementHeight, setWindowHeight] = React.useState(0);
    const myref = useRef();
    let windowSize = getWindowSize()
    var count_per_chunk = 2048;
    var count = 0
    var chunks_completed = 0


    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize);

        fetchData()
        //mytest()

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])


    async function mytest(){
        const db = new Dexie('raw_music_data');
        await db.version(1).stores(
            { songs: "id++,Name,Tempo,Valence" }
        )

        const songlist = await db.songs
            .where( 'Tempo').between( 95, 100) // This acts as index but can't chain. Whatever filters the most first should be here
            .and( item => {                                 // But we can add our own callback
                return item.Name.toLowerCase().includes("poop".toLowerCase())
                //return item.Valence > 0.95
            })
            .toArray().then(x=>{
                console.log("Filtered List: ")
                console.log(x)
            })
    }

    function DataIndexingCompleteCallback(){
        set_percent_imported(1)
        console.log("Finished indexing data!")
    }

    async function fetchData(){
        // First lets establish a connection to our IndexedDB
        const musicdb = new Dexie('raw_music_data');
        await musicdb.version(1).stores(
            { songs: "id++,Name,Tempo,Valence" }
        )

        async function loopfromserver(start_index, count){
            var chunk_map = []

            // Build a list of what each chunk will be responsible for downloading
            for(var i = start_index; i < count; i+= count_per_chunk){

                if( i + count_per_chunk > count){
                    count_per_chunk = count - i
                }

                chunk_map.push({
                    index: i,
                    count: count_per_chunk
                })
            }

            // Modifier for restarted downloads
            var modd = start_index / count_per_chunk;

            // Loop through our list of chunks defined above and actually pull the data
            for(i = 0; i < chunk_map.length; i++){

                await fetchDataChunk(chunk_map[i].index, chunk_map[i].count).then( data => {
                    chunks_completed++
                    set_percent_downloaded((chunks_completed +modd) / (chunk_map.length + modd))

                    // Add the data to the indexedDB storage, so we can use it
                    musicdb.songs.bulkAdd(data.row).then( e =>{

                        // Check the percentage complete
                        musicdb.songs.orderBy('id').last().then(max => {
                            var p = max.id / count
                            set_percent_imported(p)

                            if(p >= 1){
                                DataIndexingCompleteCallback()
                            }
                        })

                    })
                })
            }
        }

        // Let's check the id of the latest indexed song
        var songs_indexed = 0
        count = await musicdb.songs.count()
        if(count > 0) {
            await musicdb.songs.orderBy('id').last().then(max => {
                songs_indexed = max.id
            })
        }

        // Check how many songs are needed
        const req = axios.get(database_len_url).then(res=>{

            // If we already have all our data lets exit early
            if(songs_indexed === res.data.count){
                return DataIndexingCompleteCallback()
            }

            // Otherwise set our current percentage
            set_percent_imported(songs_indexed / res.data.count)

            // And start pulling data
            loopfromserver(songs_indexed, res.data.count)
        })
    }

    async function fetchDataChunk(index, count){

        var params =  { count: count, index: index }
        const req = axios.get(chunk_fetcher_url, {params})

        return req.then(res=>{
            //console.log(res.data.row)
            return res.data
        })
    }

    function setHeight(){
        var newHeight = windowSize.innerHeight - myref.current.offsetTop;

        let box = document.querySelector('.ApplicationInstaller');
        let style = getComputedStyle(box);
        let marginTop = parseInt(style.marginTop);
        let marginBottom = parseInt(style.marginBottom);
        let borderTopWidth = parseInt(style.borderTopWidth) || 0;
        let borderBottomWidth = parseInt(style.borderBottomWidth) || 0;

        let xtra_height = borderBottomWidth + borderTopWidth + marginTop + marginBottom;
        setWindowHeight(newHeight - xtra_height)
    }

    function handleWindowResize() {
        windowSize = getWindowSize()
        setHeight()
    }

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    return(
        <div ref={myref} className={'ApplicationInstaller'} style={{height: elementHeight}}>

            <div style={{margin: 'auto', width: '100%'}}>
            <div>This may take a while</div>
                <br></br>
                <div>
                    <div style={{width: '90%', margin: 'auto'}}>
                        <div style={{width:'6.5em', float:'left',  marginBottom: '0.5em'}}>Downloaded:</div>
                    </div>
                    <ProgressBar style={{margin: 'auto', width: '90%'}} now={percent_downloaded * 100} label={`${parseInt(percent_downloaded * 100)}%`} />
                </div>
                <br></br>
                <div>
                    <div style={{width: '90%', margin: 'auto'}}>
                        <div style={{width:'5em', float:'left', marginBottom: '0.5em'}}>Imported:</div>
                    </div>
                    <ProgressBar style={{margin: 'auto', width: '90%'}} now={percent_imported * 100} label={`${parseInt(percent_imported * 100)}%`} />
                </div>
            </div>
        </div>

    )
}

function ApplicationInstaller(props){
    const [elementHeight, setWindowHeight] = React.useState(0);
    const myref = useRef();
    let windowSize = getWindowSize()


    useEffect(() => {

        handleWindowResize()
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };


    }, [])

    function setHeight(){
        var newHeight = windowSize.innerHeight - myref.current.offsetTop;

        let box = document.querySelector('.ApplicationInstaller');
        let style = getComputedStyle(box);
        let marginTop = parseInt(style.marginTop);
        let marginBottom = parseInt(style.marginBottom);
        let borderTopWidth = parseInt(style.borderTopWidth) || 0;
        let borderBottomWidth = parseInt(style.borderBottomWidth) || 0;

        let xtra_height = borderBottomWidth + borderTopWidth + marginTop + marginBottom;
        setWindowHeight(newHeight - xtra_height)
    }

    function handleWindowResize() {
        windowSize = getWindowSize()
        setHeight()
    }

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    return(
        <div  ref={myref} className={'ApplicationInstaller'} style={{height: elementHeight}}>
                <div className="bg-light border">Here you can interactively explore the dataset for this analysis</div>
                <VerticalSpacer></VerticalSpacer>
                <Button variant="primary" onClick={props.startinstallcb}>Install Now</Button>{' '}
                <VerticalSpacer></VerticalSpacer>
                <VerticalSpacer></VerticalSpacer>
                <Alert variant='warning'>The dataset is very large and may take significant resources to run</Alert>
        </div>
    )
}

export default function TestPage(){
    const [display, setDisplay] = React.useState("install");

    // TODO: Check to see if already installed.
    // TODO:
    function StartInstall(){
        setDisplay("download")
    }

    let DisplayNone=(
        <div></div>
    )

    let DisplayInstall=(
        <div>
            <ApplicationInstaller startinstallcb={StartInstall}></ApplicationInstaller>
        </div>
    )

    let DisplayDownload=(
        <div>
            <DataLoader></DataLoader>
        </div>
    )

    let DisplayRun={

    }

    if(display === "none"){
        return DisplayNone
    }
    if(display === "install"){
        return DisplayInstall
    }
    if(display === "download"){
        return DisplayDownload
    }
    if(display === "run"){
        return DisplayRun
    }

    return DisplayInstall;
}

// <VerticalSpacer></VerticalSpacer>
// <TestPlot></TestPlot>
// <DataLoader></DataLoader>


// <ClientRow>What can we identify by properties of a song? Can mood be determined?</ClientRow>
// <ClientRow><SongSearchWidget></SongSearchWidget></ClientRow>
// <ClientRow><FilterComponentWidget test={true} ></FilterComponentWidget></ClientRow>