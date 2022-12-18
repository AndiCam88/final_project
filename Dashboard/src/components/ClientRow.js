import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";


export default function ClientRow(props){

    var ret_value = (
        <Row>
            <Col> </Col>
            <Col xs={5}>
                {props.children}
            </Col>
            <Col> </Col>
        </Row>
    )

    return ret_value
}