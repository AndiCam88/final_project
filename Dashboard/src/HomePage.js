import VerticalSpacer from "./components/VerticalSpacer";
import {useCallback, useContext, useEffect, useRef} from "react";
import axios from "axios";
import React from "react";
import GaugeChart from 'react-gauge-chart'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'// https://www.npmjs.com/package/react-search-autocomplete
import ResultsGroupGraph from "./components/ResultsGroupPCAChart";
import {useWebsocketContext} from "./WebsocketProvider";
import SimpleResults from "./components/SimpleResultsGuage";






export default function HomePage(){

    return(
        <div>

            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <h1>Welcome to our music feature classifier</h1>
            <SimpleResults></SimpleResults>

            <VerticalSpacer></VerticalSpacer>
            <VerticalSpacer></VerticalSpacer>
            <div>
                <VerticalSpacer></VerticalSpacer>
                <h3>Or explore the grouping details</h3>
                <VerticalSpacer></VerticalSpacer>
                <hr/>
                This graph is a 2D representation of the seperated groups. Click on a group for details about the
                classification.

            </div>

            <ResultsGroupGraph CaptureClickEvents></ResultsGroupGraph>
        </div>
    )
}
