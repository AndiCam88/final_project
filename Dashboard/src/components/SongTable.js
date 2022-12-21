import React, {useEffect, useRef} from "react";
import {useWebsocketContext} from "../WebsocketProvider";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import mapname from "./Groupnames";

function MyTable(props){
    const [rows, setRows] = React.useState([]);
    const ws = useWebsocketContext();
    const artist_cell_rows = []
    const artist_tip = []
    const title_tip = []

    var group = props.groupFilter
    if(group === undefined){
        group = -1
    }
    else if (group > 0) {
        group -=1
    }

    useEffect(() => {

        GetRows()

        ws.setCallback(2, obj=>{
            if( obj.list != null && obj.list.length > 0) {
                createRows(obj.list)
            }
        })
    }, [props.rowNumber, props.maxPages])

    function createRows(list){

        while(list.length < props.rowPerPage){
            list.push({title:"-",artists:"[]",danceability:"",energy:"",loudness:"",valence:"",tempo:"",acousticness:"",group:-2})
        }

        var rowobj = []
        for(var i = 0; i < list.length; i++){

            let artists = list[i].artists.replace('[', '')
            artists = artists.replace(']', '')
            artist_tip.push(artists)
            artists = artists.substring(0, artists.indexOf(',') !== -1? artists.indexOf(',') :  artists.length )
            artist_cell_rows.push(artists)
            title_tip.push(list[i].title)

            // TODO: Get a tooltip for the rest of the artists
            if(group === -1){
                rowobj.push(
                    <tr key={i}>
                        <td className={"customDBTitle"}><div title={title_tip[i]}>{list[i].title}</div></td>
                        <td className={"customDBArtist"}><div title={artist_tip[i]}>{artist_cell_rows[i]}</div></td>
                        <td>{list[i].danceability}</td>
                        <td>{list[i].energy}</td>
                        <td>{list[i].loudness}</td>
                        <td>{list[i].valence}</td>
                        <td>{list[i].tempo}</td>
                        <td>{list[i].acousticness}</td>
                        <td>{mapname(list[i].group)}</td>
                    </tr>
                )
            }
            else{
                rowobj.push(
                    <tr key={i}>
                        <td className={"customDBTitle"}>{list[i].title}</td>
                        <td className={"customDBArtist"}><div title={artist_tip[i]}>{artist_cell_rows[i]}</div></td>
                        <td>{list[i].danceability}</td>
                        <td>{list[i].energy}</td>
                        <td>{list[i].loudness}</td>
                        <td>{list[i].valence}</td>
                        <td>{list[i].tempo}</td>
                        <td>{list[i].acousticness}</td>
                    </tr>
                )
            }
        }


        setRows(rowobj)
    }

    function GetRows(){
        var row = props.rowNumber
        var count = props.rowPerPage
        if( row <= 0){row = 0}

        if(group === -1){
            count -=1
            row+=1
        }

        ws.sendMessage( 2,{
                row: row,
                count: count,
                groupfilter: group
            })
    }

    var header=(
        <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Dance</th>
            <th>Energy</th>
            <th>Loudness</th>
            <th>Valence</th>
            <th>Tempo</th>
            <th>Acoustic</th>
        </tr>
    )

    if(group === -1){
        header=(
            <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Dance</th>
                <th>Energy</th>
                <th>Loudness</th>
                <th>Valence</th>
                <th>Tempo</th>
                <th>Acoustic</th>
                <th>Group</th>
            </tr>)
    }

    // TODO: Fix width of columns
    return (
        <Table striped bordered hover responsive>
            <thead>
            {header}
            </thead>
            <tbody>
            {rows}
            </tbody>
        </Table>
    );
}

export default function SongTable(props){
    const [page, setPage] = React.useState(0);
    const [maxPages, setMaxPages] = React.useState(100);
    const ws = useWebsocketContext();
    let rowsPerPage = props.rowsPerPage
    let groupFilter = props.groupfilter
    const inputRef = useRef(null);

    if(rowsPerPage === undefined){
        rowsPerPage = 10
    }

    if(props.groupfilter === undefined || props.groupfilter === -2){
        groupFilter = -1
    }
    if(props.groupfilter > 0){
        groupFilter -=1
    }

    useEffect(() => {
        GetMaxRows()
        ws.setCallback(3, obj=>{
            if( obj.count != null) {
                setMaxPages(Math.floor(obj.count / rowsPerPage))
            }
        })

    }, [props.groupfilter])



    function GetMaxRows(){
        ws.sendMessage( 3,{
            group: groupFilter,
        })
    }



    function updatePage(n){
        if(n < 0) n = 0
        if(n > maxPages) n = maxPages
        inputRef.current.value = n
        setPage(n)
    }

    function inputKeyHandler(e){
        if(e.code === "Enter" || e.code === "NumpadEnter"){
            var pageNumber = parseInt(inputRef.current.value)
            if(Number.isInteger( pageNumber )){
                updatePage(pageNumber)
            }
        }
        console.log(e.code)
    }

    return(
        <div>
            <MyTable
                rowNumber={page * rowsPerPage}
                rowPerPage={rowsPerPage}
                maxPages={maxPages}
                groupFilter={props.groupfilter}
            ></MyTable>
            <div className={"customDBPageinatorRow"}>
                <div>
                    <Button onClick={e=>{updatePage(0)}} variant="secondary" size="sm" className={"customDBPageinatorButton"}>
                        «
                    </Button>
                    <Button onClick={e=>{updatePage(page-1)}} variant="secondary" size="sm" className={"customDBPageinatorButton"}>
                        ‹
                    </Button>
                </div>
                <div>
                    <input ref={inputRef} style={{width:'5em'}} onKeyDown={e=>inputKeyHandler(e)} defaultValue={page}></input> of {maxPages}
                </div>
                <div>
                    <Button onClick={e=>{updatePage(page+1)}} variant="secondary" size="sm" className={"customDBPageinatorButton"}>
                        ›
                    </Button>
                    <Button onClick={e=>{updatePage(maxPages)}} variant="secondary" size="sm" className={"customDBPageinatorButton"}>
                        »
                    </Button>
                </div>
            </div>
        </div>
    )
}