import SongTable from "./components/SongTable";




export default function ExplorePage(){
    return(
        <div>
            <SongTable groupfilter={-1} rowsPerPage={20}></SongTable>
        </div>
    )
}
