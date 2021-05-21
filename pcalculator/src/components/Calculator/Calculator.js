import React, { useState } from "react";
import Results from "../Results/Results"
import "./style.css"

export default function Calculator({option}) {

const [futureValue, setFutureValue] = useState(0)
const [interest, setInterest] = useState(0)
const [periods, setPeriods] = useState(0)
const [calculate, setCalculate] = useState(0)

const getPresentValue = (futureValue, interest, periods) => {
    let pv = futureValue/ (1 + interest) ** periods
    return numberWithCommas(pv.toFixed(2))
}

const getFutureValue = () => {
    return 
}

const handleChangeFV = (event) => {
    const { value } = event.target
    setFutureValue(value)
}

const handleChangeInterest = (event) => {
    const { value } = event.target
    setInterest(value)
}

const handleChangePeriods = (event) => {
    const { value } = event.target
    setPeriods(value)
}

const handleClick = () => {
    let pv = getPresentValue(futureValue, interest, periods)
    setCalculate(pv)
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

console.log(option)

if (futureValue !== 0) {
    console.log(futureValue, interest, periods)
}

    return (
        <div className="calculator"> 
            <h1>Financial Calculator</h1>
            <div className="input-container">
                <label for="fv">FV</label>
                <input type="text" id="fv" onChange={handleChangeFV}/>
                <label for="interest">interest</label>
                <input type="text" id="interest" onChange={handleChangeInterest}/>
                <label for="periods">periods</label>
                <input type="text" id="periods" onChange={handleChangePeriods}/>
            </div>
            <div>
                <button className="button" onClick={handleClick}>Calculate</button>
            </div>
            <Results calculation={calculate} />
        </div>
    )
}