import React, {useState, useEffect} from "react";
import {
Container,
Tab,
} from "./Sidebar";
import {
    useRecoilState,
    useRecoilValue,
  } from "recoil";
import {optionState} from "../../store";

export default function Sidebar() {
    const [active, setActive] = useState([]);
    const readOption = useRecoilValue(optionState);
    const arr = [
        {
            "type": "Present Value",
            "active": true
        },
         {
            "type": "Future Value",
            "active": false
        },
         {
            "type": "Payments",
            "active": false
        },
        {
            "type": "Interest",
            "active": false
        }
    ];

   const changeType = (option) => {
        if (option === "PV") {
            return "Present Value";
        } else if (option === "FV") {
            return "Future Value";
        } else if (option === "PMT") {
            return "Payments";
        } else {
            return "Interest";
        };
   }

    useEffect(()=> {
        let option = changeType(readOption);
            arr.forEach((item, idx) => {
                if (item.type === option) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
            setActive(arr);
    }, [readOption])
    
    const handleClick = (event) => {
        let type = event.target.innerHTML;
        arr.forEach((item, idx) => {
            if (item.type === type) {
                item.active = true;
            } else {
                item.active = false;
            }
        });
        setActive(arr);
    }

    if (active.length > 0) {
        return (
            <Container>
                {active.map((item, idx) => {
                    return <Tab onClick={handleClick} active={item.active}>{item.type}</Tab>;
                })}
            </Container>
        );
    } else {
        return (
            <Container>
                {arr.map((item, idx) => {
                    return <Tab onClick={handleClick} active={item.active}>{item.type}</Tab>;
                })}
            </Container>
        );
    }
};