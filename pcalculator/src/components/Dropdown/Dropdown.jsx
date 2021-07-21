import React from "react";
import {Calculation} from "./Dropdown";

export default function DropDown ({onChange}) {

    const options = ["PV", "FV", "PMT", "Rate"];

    return (
        <Calculation onChange={onChange}>
            {options.map((item, idx) => {
                return <option value={item}>{item}</option>
            })}
        </Calculation>
    );
}