import React, {useEffect, useState} from "react";
import {
    Container
} from "./Results";
import { Calculation } from "../Dropdown/Dropdown";

export default function Results ({calculation, option, isCalculated}) {

    const choices = ["PV", "FV", "PMT", "Rate"];
    console.log(option, isCalculated,  calculation)

    if (parseInt(calculation) !== 0) {
        return (
            <Container>
                {choices.map((item, idx) => {
                    if (item === option && isCalculated) {
                        if (option === "Rate" && parseInt(calculation) > 0) {
                            return <b>{option} = {calculation}%</b>
                        } else {
                            return <b>{option} = $ {calculation}</b>
                        }
                    } 
                })}
           </Container>
        );
    } else {
        return null;
    }
}