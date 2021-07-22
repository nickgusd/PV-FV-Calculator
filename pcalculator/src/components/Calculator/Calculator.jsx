import React, { useState, useEffect } from "react";
import Results from "../Results/Results.jsx";
import {
  CalcWrapper,
  Button,
  Input,
  Label,
  InputContainer,
} from "./Calculator.style";

export default function Calculator({ option, value }) {
  const [futureValue, setFutureValue] = useState(0);
  const [presentValue, setPresentValue] = useState(0);
  const [interest, setInterest] = useState(0);
  const [periods, setPeriods] = useState(0);
  const [payment, setPayment] = useState(0);
  const [calculate, setCalculate] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    setFutureValue("");
    setPresentValue("");
    setInterest("");
    setPeriods("");
    setCalculate("");
    setPayment("");
    setIsCalculated(false);
  }, [option]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getPresentValue = (futureValue, interest, periods) => {
    let pv = futureValue / (1 + interest) ** periods;
    return numberWithCommas(pv.toFixed(2));
  };

  const getFutureValue = (presentValue, interest, periods) => {
    let fv = presentValue * (1 + interest) ** periods;
    return numberWithCommas(fv.toFixed(2));
  };

  const getPmt = (
    rate_per_period,
    number_of_payments,
    present_value,
    future_value,
    type
  ) => {
    future_value = typeof future_value !== "undefined" ? future_value : 0;
    type = typeof type !== "undefined" ? type : 0;

    if (rate_per_period != 0.0) {
      let q = Math.pow(1 + rate_per_period, number_of_payments);
      let answer =
        -(rate_per_period * (future_value + q * present_value)) /
        ((-1 + q) * (1 + rate_per_period * type));
      return numberWithCommas(answer.toFixed(2));
    } else if (number_of_payments != 0.0) {
      let answer = -(future_value + present_value) / number_of_payments;
      return numberWithCommas(answer.toFixed(2));
    }

    return 0;
  };

  const getRate = (periods, payment, present, future, type, guess) => {
    guess = guess === undefined ? 0.01 : guess;
    future = future === undefined ? 0 : future;
    type = type === undefined ? 0 : type;

    let epsMax = 1e-10;

    let iterMax = 10;

    let y,
      y0,
      y1,
      x0,
      x1 = 0,
      f = 0,
      i = 0;
    let rate = guess;
    if (Math.abs(rate) < epsMax) {
      y =
        present * (1 + periods * rate) +
        payment * (1 + rate * type) * periods +
        future;
    } else {
      f = Math.exp(periods * Math.log(1 + rate));
      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
    }
    y0 = present + payment * periods + future;
    y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
    i = x0 = 0;
    x1 = rate;
    while (Math.abs(y0 - y1) > epsMax && i < iterMax) {
      rate = (y1 * x0 - y0 * x1) / (y1 - y0);
      x0 = x1;
      x1 = rate;
      if (Math.abs(rate) < epsMax) {
        y =
          present * (1 + periods * rate) +
          payment * (1 + rate * type) * periods +
          future;
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
    const { value } = event.target;
    setFutureValue(value);
  };

  const handleChangePV = (event) => {
    const { value } = event.target;
    setPresentValue(value);
  };

  const handleChangeInterest = (event) => {
    const { value } = event.target;
    setInterest(value);
  };

  const handleChangePeriods = (event) => {
    const { value } = event.target;
    setPeriods(value);
  };

  const handleChangePayment = (event) => {
    const { value } = event.target;
    setPayment(value);
  };

  const handleClick = () => {
    let pv = getPresentValue(
      futureValue.split(",").join(""),
      convertToDecimal(interest),
      periods.split(",").join("")
    );
    let fv = getFutureValue(
      presentValue.split(",").join(""),
      convertToDecimal(interest),
      periods.split(",").join("")
    );
    let pmt = getPmt(
      convertToDecimal(interest),
      periods.split(",").join(""),
      presentValue.split(",").join("")
    );
    let rate = getRate(
      parseInt(periods.split(",").join("")),
      parseInt(payment.split(",").join("")),
      parseInt(presentValue.split(",").join("")),
      parseInt(futureValue.split(",").join(""))
    );

    if (option === "PV") {
      setCalculate(pv);
    } else if (option === "FV") {
      setCalculate(fv);
    } else if (option === "PMT") {
      setCalculate(pmt);
    } else {
      setCalculate((rate * 100).toFixed(2));
    }
    setIsCalculated(true);
  };

  const handleClear = () => {
    setFutureValue("");
    setPresentValue("");
    setInterest("");
    setPeriods("");
    setCalculate("");
    setPayment("");
    setIsCalculated(false);
  };

  const convertToDecimal = (x) => {
    if (x < 1) {
      return x;
    } else {
      return x / 100;
    }
  };

  const test = {
    PV: {
      functions: [
          handleChangeFV, 
          handleChangeInterest, 
          handleChangePeriods
        ],
      value: [futureValue, interest, periods],
      label: ["FV", "Interest", "Periods"],
    },
    FV: {
      functions: [
          handleChangePV, 
          handleChangeInterest, 
          handleChangePeriods
        ],
      value: [presentValue, interest, periods],
      label: ["Present Value", "Interest", "Periods"],
    },
    PMT: {
      functions: [
        handleChangeFV,
        handleChangePV,
        handleChangeInterest,
        handleChangePeriods,
      ],
      value: [futureValue, presentValue, interest, periods],
      label: ["Future Value", "Present Value", "Interest Rate", "Periods"],
    },
    Rate: {
      functions: [
        handleChangeFV,
        handleChangePV,
        handleChangeInterest,
        handleChangePeriods,
      ],
      value: [futureValue, presentValue, interest, periods],
      label: ["Future Value", "Present Value", "Interest Rate", "Periods"],
    },
  };

  return (
    <CalcWrapper>
      {value.map((item, idx) => {
        if (item === option) {
          return (
            <div>
              <h1>{item} Calculator</h1>
              <InputContainer>
                {test[item].functions.map((thing, index) => {
                  return (
                    <div>
                      <Label for={test[item]}>{test[item].label[index]}</Label>
                      <Input
                        type="text"
                        id={test[item]}
                        value={test[item].value[index]}
                        onChange={thing}
                      />
                    </div>
                  );
                })}
              </InputContainer>
            </div>
          );
        }
      })}
      {isCalculated ? (
        <Button className="button" onClick={handleClear}>
          Clear
        </Button>
      ) : (
        <Button className="button" onClick={handleClick}>
          Calculate
        </Button>
      )}
      <Results
        calculation={calculate}
        option={option}
        isCalculated={isCalculated}
      />
    </CalcWrapper>
  );
}