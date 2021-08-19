import React from "react";

import {
    Container
} from "./Results";

import {
    numberWithCommas
} from "../../helpers";


export default function Results ({calculation, option, isCalculated}) {

    const choices = ["PV", "FV", "PMT", "Rate"];
     

    if (parseInt(calculation) !== 0) {
        return (
            <Container>
                {choices.map((item, idx) => {
                    if (item === option && isCalculated) {
                        if (option === "Rate" && parseInt(calculation) > 0) {
                            return <b>{option} = {numberWithCommas(calculation)}%</b>
                        } else {
                            return <b>{option} = $ {numberWithCommas(calculation)}</b>
                        }
                    } 
                })}
           </Container>
        );
    } else {
        return null;
    }
}  