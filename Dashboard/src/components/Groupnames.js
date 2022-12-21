

export default function mapname(n){
    if( n === undefined){
        return ""
    }
    switch(n){
        case -1:
            return "-"
        case -1:
            return ""
        case 0:
            return "Sad"
        case 1:
            return "Calm"
        case 2:
            return "Energetic"
        case 3:
            return "Happy"
        case 4:
            return "Group 5"
        case 5:
            return "Group 6"
    }
    return ""
}

export function mapcolor(n){
    switch(n){
        case 0:
            return "#ff0000"
        case 1:
            return "#ffa500"
        case 2:
            return "#0000ff"
        case 3:
            return "#800080"
        case 4:
            return "#008000"
        case 5:
            return "#a52a2a"
    }
}