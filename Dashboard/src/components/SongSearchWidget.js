import React from "react";
import Form from "react-bootstrap/Form";

export default function SongSearchWidget(props){
    const [search_value, set_search_value] = React.useState('');

    function handleChange(event){
        set_search_value(event.target.value)
        console.log(props)
    }

    return(
        <Form.Group className="mb-3">
            <Form.Label>Enter a song name or click <a href={'explore'}>explore</a> in the menu above</Form.Label>
            <Form.Control type="text" placeholder="" onChange={handleChange}/>
        </Form.Group>
    )
}