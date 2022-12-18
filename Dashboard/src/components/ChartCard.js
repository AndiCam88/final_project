import Card from "react-bootstrap/Card";

export default function ChartCard(props){
    return(
        <Card fluid="sm" >
            <Card.Title>{props.title}</Card.Title>
            <div className={"chartframe"} >
                <div className={'verticalText'}>{props.yaxis}</div>
                <div className={'chartframeinner'}>
                    <img alt={props.title} style={{width:'100%'}} src={props.chart_src}/>
                    <div className={'chartxlabel'}>{props.xaxis}</div>
                </div>
            </div>
            <Card.Body>
                {props.children}
            </Card.Body>
        </Card>
    )
}