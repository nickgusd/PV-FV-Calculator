import React from "react";
import "./style.css"

export default function Results ({calculation}) {

    if (calculation !== 0) {
        return (
            <div className="results">
                <b>Present Value {calculation}</b>
            </div>
        )
    } else {
        return null
    }
}