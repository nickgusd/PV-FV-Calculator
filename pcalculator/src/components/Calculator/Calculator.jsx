import React, { useState, useEffect } from "react";
import Results from "../Results/Results.jsx";
import {
    CalcWrapper,
    Button,
    Input,
    Label,
    InputContainer
} from "./Calculator.style";


export default function Calculator({ option }) {

    const [futureValue, setFutureValue] = useState(0)
    const [presentValue, setPresentValue] = useState(0)
    const [interest, setInterest] = useState(0)
    const [periods, setPeriods] = useState(0)
    const [payment, setPayment] = useState(0)
    const [calculate, setCalculate] = useState(0)
    const [isCalculated, setIsCalculated] = useState(false)

    useEffect(() => {
        setFutureValue("")
        setPresentValue("")
        setInterest("")
        setPeriods("")
        setCalculate("")
        setPayment("")
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

        if (rate_per_period != 0.0) {
            let q = Math.pow(1 + rate_per_period, number_of_payments);
            let answer = -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)))
            return numberWithCommas(answer.toFixed(2))

        } else if (number_of_payments != 0.0) {
            let answer = -(future_value + present_value) / number_of_payments
            return numberWithCommas(answer.toFixed(2))
        }

        return 0;
    }

    const getRate = (periods, payment, present, future, type, guess) => {
        guess = (guess === undefined) ? 0.01 : guess;
        future = (future === undefined) ? 0 : future;
        type = (type === undefined) ? 0 : type;

        let epsMax = 1e-10;

        let iterMax = 10;

        let y, y0, y1, x0, x1 = 0,
            f = 0,
            i = 0;
        let rate = guess;
        if (Math.abs(rate) < epsMax) {
            y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
        } else {
            f = Math.exp(periods * Math.log(1 + rate));
            y = present * f + payment * (1 / rate + type) * (f - 1) + future;
        }
        y0 = present + payment * periods + future;
        y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
        i = x0 = 0;
        x1 = rate;
        while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
            rate = (y1 * x0 - y0 * x1) / (y1 - y0);
            x0 = x1;
            x1 = rate;
            if (Math.abs(rate) < epsMax) {
                y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
            } else {
                f = Math.exp(periods * Math.log(1 + rate));
                y = present * f + payment * (1 / rate + type) * (f - 1) + future;
            }
            y0 = y1;
            y1 = y;
            ++i;
        }
        return rate;
    };

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

    const handleChangePayment = (event) => {
        const { value } = event.target
        setPayment(value)
    }

    const handleClick = () => {

        let pv = getPresentValue(futureValue.split(",").join(""), convertToDecimal(interest), periods.split(",").join(""))
        let fv = getFutureValue(presentValue.split(",").join(""), convertToDecimal(interest), periods.split(",").join(""))
        let pmt = getPmt(convertToDecimal(interest), periods.split(",").join(""), presentValue.split(",").join(""))
        let rate = getRate(parseInt(periods.split(",").join("")), parseInt(payment.split(",").join("")), parseInt(presentValue.split(",").join("")), parseInt(futureValue.split(",").join("")))

        if (option === "present value") {
            setCalculate(pv)
        } else if (option === "future value") {
            setCalculate(fv)
        } else if (option === "payments") {
            setCalculate(pmt)
        } else {
            setCalculate((rate * 100).toFixed(2))
        }
        
        setIsCalculated(true)
    }

    const handleClear = () => {
        setFutureValue("")
        setPresentValue("")
        setInterest("")
        setPeriods("")
        setCalculate("")
        setPayment("")
        setIsCalculated(false)
    }

    const convertToDecimal = (x) => {
        if (x < 1) {
            return x
        } else {
            return x / 100
        }
    }

    if (option === "PV") {
        return (
            <CalcWrapper>
                <h1>PV Calculator</h1>
                <InputContainer>
                    <Label for="fv">FV</Label>
                    <Input type="text" id="fv" value={futureValue} onChange={handleChangeFV} />
                    <Label for="interest">interest</Label>
                    <Input type="text" id="interest" value={interest} onChange={handleChangeInterest} />
                    <Label for="periods">periods</Label>
                    <Input type="text" id="periods" value={periods} onChange={handleChangePeriods} />
                    </InputContainer>               
                    {isCalculated ? <Button className="button" onClick={handleClear}>Clear</Button> : <Button className="button" onClick={handleClick}>Calculate</Button>}
                <Results calculation={calculate} option={option} isCalculated={isCalculated} />
                </CalcWrapper>
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
                    <input type="text" id="fv" value={futureValue} onChange={handleChangeFV} />
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
                    <label for="fv">FV</label>
                    <input type="text" id="fv" value={futureValue} onChange={handleChangeFV} />
                    <label for="pv">PV</label>
                    <input type="text" id="pv" value={presentValue} onChange={handleChangePV} />
                    <label for="payment">payment</label>
                    <input type="text" id="payment" value={payment} onChange={handleChangePayment} />
                    <label for="periods">periods</label>
                    <input type="text" id="periods" value={periods} onChange={handleChangePeriods} />
                </div>
                <div>
                    {isCalculated ? <button className="button" onClick={handleClear}>Clear</button> : <button className="button" onClick={handleClick}>Calculate</button>}
                </div>
                <Results calculation={calculate} option={option} isCalculated={isCalculated} />
            </div>
        )
    }
}