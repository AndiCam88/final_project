import {dGroup1} from "./Group1SVGPath";
import {dGroup2} from "./Group2SVGPath";
import {dGroup3} from "./Group3SVGPath";
import {dGroup4} from "./Group4SVGPath";
import {dGroup5} from "./Group5SVGPath";
import {dGroup6} from "./Group6SVGPath";


export default function PCAGroup(props){
    var fillcolor=""
    var strokecolor = ""
    var className = "svggroup"
    var classPath = "svgitem"
    var stroke_width = "1"
    var groupname = ""
    var label=(<div></div>);
    var groupd = ""
    var domID = ""

    var leftOffset = "-32"
    if(props.leftOffset != null){
        leftOffset = String(props.leftOffset)
    }
    var viewbox = leftOffset + " -16 640 480"

    viewbox = "0 0 2500 1875"

    if(props.id === 1){
        fillcolor = "red"
        strokecolor = "red"
        groupname = "Group 1"
        groupd = dGroup1
        domID = "Group1"
    }

    if(props.id === 2){
        fillcolor = "orange"
        strokecolor = "orange"
        groupname = "Group 2"
        groupd = dGroup2
        domID = "Group2"
    }

    if(props.id === 3){
        fillcolor = "blue"
        strokecolor = "blue"
        groupname = "Group 3"
        groupd = dGroup3
        domID = "Group3"
    }

    if(props.id === 4){
        fillcolor = "purple"
        strokecolor = "purple"
        groupname = "Group 4"
        groupd = dGroup4
        domID = "Group4"
    }

    if(props.id === 5){
        fillcolor = "green"
        strokecolor = "green"
        groupname = "Group 5"
        groupd = dGroup5
        domID = "Group5"
    }

    if(props.id === 6){
        fillcolor = "brown"
        strokecolor = "brown"
        groupname = "Group 6"
        groupd = dGroup6
        domID = "Group6"
    }

    if(props.active){
        classPath += " svghighlight"
        strokecolor = "#101010"
        stroke_width = "1.5"
        label=(<div className={"svgGroupLabel"} style={{color: fillcolor}}>{groupname}</div>)
    }
    else if(props.minimized){
        classPath += " svgminimize"
    }




    return (
            <div className={className}  >
                {label}
                <svg className={"svgObject"} xmlns="http://www.w3.org/2000/svg" viewBox={viewbox}>
                    <path className={classPath}
                          id={domID}
                          onMouseEnter={()=>props.mouseEnterCallback(props.id)}
                          onMouseLeave={()=>props.mouseLeaveCallback(props.id)}
                          onClick={()=>props.mouseClickCallback(props.id)}
                          fill={fillcolor}
                          stroke={strokecolor}
                          strokeWidth={stroke_width}
                          d={groupd} />
                </svg>
            </div>
    )
}
