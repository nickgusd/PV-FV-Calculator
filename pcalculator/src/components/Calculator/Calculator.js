import React, { useState, useEffect } from "react";
import Results from "../Results/Results"
import "./style.css"

export default function Calculator({ option }) {

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

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getPresentValue = (futureValue, interest, periods) => {
        let pv = futureValue / (1 + interest) ** periods
        return numberWithCommas(pv.toFixed(2))
    }

    const getFutureValue = (presentValue, interest, periods) => {
        let fv = presentValue * ((1 + interest) ** periods)
        console.log(fv)
        return numberWithCommas(fv.toFixed(2))
    }


    const getPmt = (rate_per_period, number_of_payments, present_value, future_value, type) => {
        future_value = typeof future_value !== 'undefined' ? future_value : 0;
        type = typeof type !== 'undefined' ? type : 0;
    
        if(rate_per_period != 0.0){
            // Interest rate exists
            let q = Math.pow(1 + rate_per_period, number_of_payments);
            let answer = -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)))
            return numberWithCommas(answer.toFixed(2))
    
        } else if(number_of_payments != 0.0){
            // No interest rate, but number of payments exists
            let answer = -(future_value + present_value) / number_of_payments
            return numberWithCommas(answer.toFixed(2))
        }
    
        return 0;
    }
 
    console.log(getPmt(.07, 5, 100000))

  

    const handleChangeFV = (event) => {
        const { value } = event.target
        setFutureValue(value)
    }

    const handleChangePV = (event) => {
        const { value } = event.target
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
        let pv = getPresentValue(futureValue.split(",").join(""), convertToDecimal(interest), periods.split(",").join(""))
        let fv = getFutureValue(presentValue.split(",").join(""), convertToDecimal(interest), periods.split(",").join(""))
        let pmt = getPmt(convertToDecimal(interest), periods.split(",").join(""), presentValue.split(",").join("") )

        if (option === "present value") {
            setCalculate(pv)
        } else if (option === "future value") {
            setCalculate(fv)
        } else if (option === "payments") {
            setCalculate(pmt)
        }
        setIsCalculated(true)
    }

    const handleClear = () => {
        setFutureValue("")
        setPresentValue("")
        setInterest("")
        setPeriods("")
        setCalculate("")
        setIsCalculated(false)
    }

    // const numberWithCommas = (x) => {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    const convertToDecimal = (x) => {
        if (x < 1) {
            return x
        } else {
            return x/100
        }
    }
   
    if (option === "present value") {
        return (
            <div className="calculator">
                <h1>PV Calculator</h1>
                <div className="input-container">
                    <label for="fv">FV</label>
                    <input type="text" id="fv" value={futureValue} onChange={handleChangeFV} />
                    <label for="interest">interest</label>
                    <input type="text" id="interest" value={interest} onChange={handleChangeInterest} />
                    <label for="periods">periods</label>
                    <input type="text" id="periods" value={periods} onChange={handleChangePeriods} />
                </div>
                <div>
                    {isCalculated ? <button className="button" onClick={handleClear}>Clear</button> : <button className="button" onClick={handleClick}>Calculate</button>}
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
                    <input type="text" id="pv" value={presentValue} onChange={handleChangePV} />
                    <label for="interest">interest</label>
                    <input type="text" id="interest" value={interest} onChange={handleChangeInterest} />
                    <label for="periods">periods</label>
                    <input type="text" id="periods" value={periods} onChange={handleChangePeriods} />
                </div>
                <div>
                    {isCalculated ? <button className="button" onClick={handleClear}>Clear</button> : <button className="button" onClick={handleClick}>Calculate</button>}
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
                    <input type="text" id="fv" onChange={handleChangeFV} />
                    <label for="pv">PV</label>
                    <input type="text" id="pv" value={presentValue} onChange={handleChangePV} />
                    <label for="interest">interest</label>
                    <input type="text" id="interest" value={interest} onChange={handleChangeInterest} />
                    <label for="periods">periods</label>
                    <input type="text" id="periods" value={periods} onChange={handleChangePeriods} />
                </div>
                <div>
                    {isCalculated ? <button className="button" onClick={handleClear}>Clear</button> : <button className="button" onClick={handleClick}>Calculate</button>}
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
                    <input type="text" id="interest" onChange={handleChangeFV} />
                    <label for="interest">interest</label>
                    <input type="text" id="interest" onChange={handleChangeInterest} />
                    <label for="periods">periods</label>
                    <input type="text" id="periods" onChange={handleChangePeriods} />
                </div>
                <div>
                    {isCalculated ? <button className="button" onClick={handleClear}>Clear</button> : <button className="button" onClick={handleClick}>Calculate</button>}
                </div>
                <Results calculation={calculate} option={option} isCalculated={isCalculated} />
            </div>
        )
    }
}