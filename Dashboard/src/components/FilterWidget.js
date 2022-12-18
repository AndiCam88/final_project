import Card from "react-bootstrap/Card";
import Slider from "rc-slider";
import Button from "react-bootstrap/Button";
import React from "react";

export default function FilterComponentWidget(props){
    const marks = {
        1900: "1900",
        2020: "2020",
    };

    function log(value) {
        // TODO: Add a debouncer
        console.log(value); //eslint-disable-line
    }

    return(
        <Card style={{ width: '18rem' }}>

            <Card.Body>
                <Card.Title>Filters</Card.Title>
                <Slider
                    range
                    min={1900}
                    max={2020}
                    marks={marks}
                    onChange={log}
                    defaultValue={[2000, 2020]}
                    allowCross={false}
                    draggableTrack
                />
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}