import React, {useState} from "react";
import Calculator from "../Calculator/Calculator"

import "./style.css"

export default function Container() {

    const [type, setType] = useState("present value")

    const handleChange = (event) => {
        const {value} = event.target
        setType(value)
    }

    return (
        <div className="container">
            <select name="calculation" id="calculation" onChange={handleChange}>
                <option value="present value">PV</option>
                <option value="future value">FV</option>
                <option value="payments">PMT</option>
                <option value="interest rate">Interest Rate</option>
            </select>
            <Calculator option={type} />
        </div>
    )
}