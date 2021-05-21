import React from "react";
import Calculator from "../Calculator/Calculator"
import Results from "../Results/Results"
import "./style.css"

export default function Container(){
    return (
        <div>
            <Calculator />
            <Results />
        </div>
    )
}