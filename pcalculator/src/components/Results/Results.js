import React from "react";
import "./style.css"
import Calculator from "../Calculator/Calculator";

export default function Results ({calculation, option}) {

    console.log(calculation, option)

    if (calculation !== 0) {
        console.log(calculation)
        return (
            <div className="results">
                <b>{option} {calculation}</b>
            </div>
        )
    } else {
        return null
    }
}