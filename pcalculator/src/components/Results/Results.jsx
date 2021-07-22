import React, {useEffect, useState} from "react";
import {
    Container
} from "./Results";

export default function Results ({calculation, option, isCalculated}) {

    const choices = ["PV", "FV", "PMT", "Rate"];

    if (calculation !== 0) {
        return (
            <Container>
                {choices.map((item, idx) => {
                    if (item === option && isCalculated) {
                        if (option === "interest rate") {
                            return <b>{option} % {calculation}</b>
                        } else {
                            return <b>{option} $ {calculation}</b>
                        }
                    }
                })}
           </Container>
        );
    } else {
        return null;
    }
}