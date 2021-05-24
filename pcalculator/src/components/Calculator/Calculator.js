import React, { useState, useEffect } from "react";
import Results from "../Results/Results"
import "./style.css"

export default function Calculator({option}) {

const [futureValue, setFutureValue] = useState(0)
const [presentValue, setPresentValue] = useState(0)
const [interest, setInterest] = useState(0)
const [periods, setPeriods] = useState(0)
const [calculate, setCalculate] = useState(0)
const [isCalculated, setIsCalculated] = useState(false)

useEffect(() => {
    setFutureValue("")
    setPresentValue("")
    setInterest("")
    setPeriods("")
    setCalculate("")
    setIsCalculated(false)

}, [option])

const getPresentValue = (futureValue, interest, periods) => {
    let pv = futureValue/ (1 + interest) ** periods
    return numberWithCommas(pv.toFixed(2))
}

const getFutureValue = (presentValue, interest, periods) => {
    let fv = presentValue * ((1 + interest) ** periods) 
    console.log(fv)
    return numberWithCommas(fv.toFixed(2))
}

const getPayment = (presentValue, futureValue, interest, periods) => {
    // (PV x ((PV + FV) ÷ ((1 + r)n-1)) x (-r ÷ (1 + b))
   
   
    // let pmt = (presentValue * ((presentValue + futureValue)) / ((1 + interest) ** periods-1)) * (-interest + (1 + 0))
    let pmt = (presentValue + ((presentValue + futureValue) / ((1 + interest) ** periods - 1)) * (-interest / (1 + interest)))

    return pmt
}

const getRate = (presentValue, futureValue, interest, periods) => {
    let pv = futureValue/ (1 + interest) ** periods

    let rate = pv * interest * periods

    return rate

}



console.log(getPayment(1000, 2000, .022, 10 ))

const handleChangeFV = (event) => {
    const { value } = event.target
    setFutureValue(value)
}

const handleChangePV = (event) => {
    const {value} = event.target
    setPresentValue(value)
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
    let fv = getFutureValue(presentValue,interest, periods)

    if (option === "present value") {
        setCalculate(pv)
    } else if (option === "future value") {
        setCalculate(fv)
    }

    setIsCalculated(true)

}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if (option === "present value") {
    return (
        <div className="calculator"> 
            <h1>PV Calculator</h1>
            <div className="input-container">
                <label for="fv">FV</label>
                <input type="text" id="fv" value={futureValue} onChange={handleChangeFV}/>
                <label for="interest">interest</label>
                <input type="text" id="interest" value={interest} onChange={handleChangeInterest}/>
                <label for="periods">periods</label>
                <input type="text" id="periods" value={periods} onChange={handleChangePeriods}/>
            </div>
            <div>
                <button className="button" onClick={handleClick}>Calculate</button>
            </div>
            <Results calculation={calculate} option={option} isCalculated={isCalculated} /> 
        </div>
    )
} else if (option === "future value") {
    return (
        <div className="calculator"> 
            <h1> FV Calculator</h1>
            <div className="input-container">
                <label for="pv">PV</label>
                <input type="text" id="pv" value={presentValue} onChange={handleChangePV}/>
                <label for="interest">interest</label>
                <input type="text" id="interest" value={interest} onChange={handleChangeInterest}/>
                <label for="periods">periods</label>
                <input type="text" id="periods" value={periods} onChange={handleChangePeriods}/>
            </div>
            <div>
                <button className="button" onClick={handleClick}>Calculate</button>
            </div>
            <Results calculation={calculate} option={option} isCalculated={isCalculated} />
        </div>
    )
} else if (option === "payments") {
    return (
        <div className="calculator"> 
            <h1>PMT Calculator</h1>
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
            <Results calculation={calculate} option={option} isCalculated={isCalculated} />
        </div>
    )
} else {
    return (
        <div className="calculator"> 
            <h1>Rate Calculator</h1>
            <div className="input-container">
                <label for="interest">FV</label>
                <input type="text" id="interest" onChange={handleChangeFV}/>
                <label for="interest">interest</label>
                <input type="text" id="interest" onChange={handleChangeInterest}/>
                <label for="periods">periods</label>
                <input type="text" id="periods" onChange={handleChangePeriods}/>
            </div>
            <div>
                <button className="button" onClick={handleClick}>Calculate</button>
            </div>
            <Results calculation={calculate} option={option} isCalculated={isCalculated} />
        </div>
    )
}
}