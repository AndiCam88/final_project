package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/gobwas/ws"
	"github.com/gobwas/ws/wsutil"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
	"log"
	"net/http"
	"os"
	"time"
)

const autocomplete_request = 0
const groupid_request = 1
const simple_table_request = 2
const simple_row_count = 3

type fullRow struct {
	//ID               string  `csv:"id"`
	Name string `csv:"name"`
	//Artists string `csv:"artists"`
	//ArtistIds        string  `csv:"artist_ids"`
	//TrackNumber int8 `csv:"track_number"`
	//DiskNumber  int8 `csv:"disc_number"`
	//Explicit         bool    `csv:"explicit"`
	//Danceability     float32 `csv:"danceability"`
	//Energy           float32 `csv:"energy"`
	//Key              int8    `csv:"key"`
	//Loudness         float32 `csv:"loudness"`
	//Mode             int8    `csv:"mode"`
	//Speechiness      float32 `csv:"speechiness"`
	//Acousticness     float32 `csv:"acousticness"`
	//Instrumentalness float32 `csv:"instrumentalness"`
	//Liveness         float32 `csv:"liveness"`
	Valence float32 `csv:"valence"`
	Tempo   float32 `csv:"tempo"`
	//Duration         int32   `csv:"duration_ms"`
	//TimeSignature    float32 `csv:"time_signature"`
	//Year             int16   `csv:"year"`
	//ReleaseDate      string  `csv:"release_date"`
}

type chunkOfRowsRequest struct {
	Count      int32 `json:"count"`
	StartIndex int32 `json:"index"`
}

type chunkOfRows struct {
	Row           []fullRow `json:"row"`
	RowsRemaining int64     `json:"remain"`
}

type autocompleteSuggestion struct {
	Name    string `json:"name"`
	Id      int    `json:"id""`
	Index   string `json:"index""`
	Artists string `json:"artists""`
}

var postgresdb *sql.DB
var sqlitedb *sql.DB

func connectToPosgres() {
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("PG_HOST"),
		os.Getenv("PG_PORT"),
		os.Getenv("PG_USER"),
		os.Getenv("PG_PASS"),
		os.Getenv("PG_NAME"))

	var err error
	postgresdb, err = sql.Open("postgres", connStr)

	if err != nil {
		fmt.Printf("Unable to connect")
	}

	if err = postgresdb.Ping(); err != nil {
		fmt.Printf("Unable to access db")
	}

	fmt.Println("The database is connected")
}

func getGroupForSong(byteObj []byte) string {
	// Decode our input
	type msg struct {
		Id string `json:"id"`
	}

	var msgObj msg
	err := json.Unmarshal(byteObj, &msgObj)
	if err != nil {
		// handle error
	}

	// Format our output
	type outputStruct struct {
		Group int `json:"group"`
	}

	outObj := outputStruct{}

	rows, err := sqlitedb.Query("select label from tracks_features where id=?", msgObj.Id)
	for rows.Next() {
		err = rows.Scan(&outObj.Group)
		if err != nil {
			fmt.Printf("Query Extractor Failed on getting group")
		}
		break
	}

	outMsg, _ := json.Marshal(&outObj)
	return string(outMsg[:])
}

func appendToList(list *[]autocompleteSuggestion, autocomplete_id int, suggestion string, id string, artists string) {
	item := autocompleteSuggestion{
		Id:      autocomplete_id,
		Name:    suggestion,
		Index:   id,
		Artists: artists,
	}

	*list = append(*list, item)
}

func getAutoCompleteResultsFromSqlite3(byteObj []byte) string {
	// Define our output
	numericalId := 0

	// This is to format our output
	type outputStruct struct {
		List []autocompleteSuggestion `json:"list"`
	}
	outputObj := outputStruct{}

	// Decode our input
	type msg struct {
		Title  string `json:"title"`
		Artist string `json:"artist"`
	}

	var msgObj msg
	err := json.Unmarshal(byteObj, &msgObj)
	if err != nil {
		// handle error
	}

	// Exit early if we don't have enought data
	if len(msgObj.Title)+len(msgObj.Artist) < 3 {
		output, _ := json.Marshal(outputObj)
		return string(output[:])
	}

	// Create our query
	var rows *sql.Rows
	if msgObj.Artist == "" {
		rows, err = sqlitedb.Query("SELECT id, name, artists FROM tracks_features WHERE lname like LOWER(?) LIMIT 10", fmt.Sprintf(`%%%s%%`, msgObj.Title))
		if err != nil {
			// Handle Error
			fmt.Println("Error from query")
		}
	} else {
		rows, err = sqlitedb.Query("SELECT id, name, artists FROM tracks_features WHERE lname like LOWER(?) AND lartists LIKE LOWER(?) LIMIT 10", fmt.Sprintf(`%%%s%%`, msgObj.Title), fmt.Sprintf(`%%%s%%`, msgObj.Artist))
		if err != nil {
			// Handle Error
			fmt.Println("Error from query")
		}
	}

	// Make sure we close this 'rows' connection when we are done
	defer rows.Close()

	// Go through our results and prepare
	for rows.Next() {
		// The values we are going to extract
		var trackName string
		var id string
		var artists string

		// Actually extract the values
		err = rows.Scan(&id, &trackName, &artists)
		if err != nil {
			// Handle error
			fmt.Printf("Query Extractor Failed")
		}

		// Append the item to our return list and increment our id counter
		appendToList(&outputObj.List, numericalId, trackName, id, artists)
		numericalId = numericalId + 1
	}

	output, _ := json.Marshal(outputObj)
	return string(output[:])
}

func getSimpleTable(byteObj []byte) string {
	// Input
	type msg struct {
		RowStart int `json:"row"`
		Count    int `json:"count"`
		Group    int `json:"groupfilter"`
	}

	// Decode the message
	var msgObj msg
	err := json.Unmarshal(byteObj, &msgObj)
	if err != nil {
		// handle error
		fmt.Println("error here")
	}

	type rowStruct struct {
		Title        string  `json:"title"`
		Artist       string  `json:"artists"`
		Danceability float32 `json:"danceability"`
		Energy       float32 `json:"energy"`
		Loudness     float32 `json:"loudness"`
		Valence      float32 `json:"valence"`
		Tempo        float32 `json:"tempo"`
		Acousticness float32 `json:"acousticness"`
		Group        int     `json:"group"`
	}

	type outputStruct struct {
		List []rowStruct `json:"list"`
	}
	outputObj := outputStruct{}

	// Create our query

	var rows *sql.Rows
	if msgObj.Group == -1 {
		rows, err = sqlitedb.Query("select name, artists, danceability, energy, loudness, valence, tempo, acousticness, label from tracks_features where ROWID between ? and ?", msgObj.RowStart, msgObj.RowStart+msgObj.Count)
		if err != nil {
			// handle error
			fmt.Println("error here")
		}
	} else {
		rows, err = sqlitedb.Query("select name, artists, danceability, energy, loudness, valence, tempo, acousticness, label from tracks_features where label=? limit ? offset ?", msgObj.Group, msgObj.Count, msgObj.RowStart)
		if err != nil {
			// handle error
			fmt.Println("error here")
		}
	}

	// Make sure we close this 'rows' connection when we are done
	defer rows.Close()

	// Go through our results and prepare
	for rows.Next() {
		row := rowStruct{}

		err = rows.Scan(&row.Title,
			&row.Artist,
			&row.Danceability,
			&row.Energy,
			&row.Loudness,
			&row.Valence,
			&row.Tempo,
			&row.Acousticness,
			&row.Group)
		if err != nil {
			// Handle error
			fmt.Printf("Query Extractor Failed")
		}

		outputObj.List = append(outputObj.List, row)
	}

	output, _ := json.Marshal(outputObj)
	return string(output[:])
}

func getSimpleRowCount(byteObj []byte) string {
	type msg struct {
		Group int `json:"group"`
	}

	// Decode the message
	var msgObj msg
	err := json.Unmarshal(byteObj, &msgObj)
	if err != nil {
		// handle error
		fmt.Println("error here")
	}

	type outputStruct struct {
		Count int `json:"count"`
	}
	outputObj := outputStruct{}

	// Create our query
	var rows *sql.Rows
	if msgObj.Group == -1 {
		rows, err = sqlitedb.Query("SELECT count(*) FROM tracks_features")
		if err != nil {
			// handle error
			fmt.Println("error here")
		}
	} else {
		rows, err = sqlitedb.Query("select count(*) from tracks_features where label=?", msgObj.Group)
		if err != nil {
			// handle error
			fmt.Println("error here")
		}
	}

	// Make sure we close this 'rows' connection when we are done
	defer rows.Close()

	// Go through our results and prepare
	for rows.Next() {

		err = rows.Scan(&outputObj.Count)
		if err != nil {
			// Handle error
			fmt.Printf("Query Extractor Failed")
		}
	}

	output, _ := json.Marshal(outputObj)
	return string(output[:])
}

// See more details at https://github.com/gobwas/ws
func StartWebsocketServer() {

	// Define a structure that will hold our message
	type websocketMessage struct {
		Code      int    `json:"code"`
		MsgString string `json:"message"`
	}

	type outputMessage struct {
		Code    int    `json:"code"`
		ByteObj string `json:"obj"`
	}

	// Start another http server that specifically runs our websocket service
	http.ListenAndServe(os.Getenv("WEBSOCKET_PORT"), http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		conn, _, _, err := ws.UpgradeHTTP(r, w)
		if err != nil {
			// handle error
		}

		// We are creating what looks like an anonymous go function/routine that I think runs per client
		// connection.
		go func() {

			// Again this defer thing. I really need to figure out what this does
			defer conn.Close()

			// Run an infinite loop. I believe this wsutil.ReadCLientData() blocks.
			// Right now if anything unexpected happens we are simply killing breaking from the
			// loop. TODO: Find out how to gracefully send the close message to the client and
			// handle these errors better
			for {

				// Wait for a message
				msg, op, err := wsutil.ReadClientData(conn)
				if err != nil {
					//fmt.Println("One")
					return
				}

				// Close the message if needed
				if op == ws.OpClose {
					//fmt.Println("Two")
					return
				}

				// Get info about the incoming message
				msgObj := websocketMessage{}
				err = json.Unmarshal(msg, &msgObj)
				if err != nil {
					//fmt.Println("Three")
					return
				}

				var objvalue string

				switch msgObj.Code {
				case autocomplete_request:
					{
						objvalue = getAutoCompleteResultsFromSqlite3([]byte(msgObj.MsgString))
					}
				case groupid_request:
					{
						objvalue = getGroupForSong([]byte(msgObj.MsgString))
					}
				case simple_table_request:
					{
						objvalue = getSimpleTable([]byte(msgObj.MsgString))
					}
				case simple_row_count:
					{
						objvalue = getSimpleRowCount([]byte(msgObj.MsgString))
					}
				}

				oMsg := outputMessage{
					Code:    msgObj.Code,
					ByteObj: objvalue,
				}
				output, _ := json.Marshal(oMsg)

				err = wsutil.WriteServerMessage(conn, op, output)
				if err != nil {
					return
				}
			}
		}()
	}))

}

func main() {
	// Make sure our ENV file is loaded
	godotenv.Load()

	// Connect to our sqlite3 db
	var err error
	sqlitedb, err = sql.Open("sqlite3", os.Getenv("SQLITE_DB_NAME"))
	if err != nil {
		// handle error
	}

	// Connect to our postgres db
	connectToPosgres()

	// Start our websocket server
	go StartWebsocketServer()

	// Initialize a router object
	router := mux.NewRouter()

	// Define the routes'
	//router.HandleFunc("/test", getRows)

	// Define some server details
	srv := &http.Server{
		Handler:      router,
		Addr:         os.Getenv("RESTFUL_PORT"),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	// And start the server
	log.Fatal(srv.ListenAndServe())

	//// Look into https://medium.com/@pinkudebnath/graceful-shutdown-of-golang-servers-using-context-and-os-signals-cc1fa2c55e97

	postgresdb.Close()
	sqlitedb.Close()
}
