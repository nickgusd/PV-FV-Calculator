import React, {useEffect, useState} from "react";
import "./style.css"
import Calculator from "../Calculator/Calculator";

export default function Results ({calculation, option, isCalculated}) {

    const choices = ["present value", "future value", "payments", "interest rate"]

    if (calculation !== 0) {
        console.log(calculation)
        return (
            <div className="results">
                {choices.map((item, idx) => {
                    if (item === option && isCalculated) {
                        return <b>{option} ${calculation}</b>
                    }
                })}
                
            </div>
        )
    } else {
        return null
    }
}