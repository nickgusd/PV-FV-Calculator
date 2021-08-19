import React, { useEffect } from "react";
import Results from "../Results/Results.jsx";
import { DeleteBtn } from "./Calculator.style";
import { useRecoilState } from "recoil";
import {
  CalcWrapper,
  Button,
  Input,
  Label,
  InputContainer,
  Container,
  BtnContainer,
  Hidden,
} from "./Calculator.style";
import {
  futureValueState,
  presentValueState,
  interestState,
  periodsState,
  paymentState,
  calculateState,
  isCalculatedState,
} from "../../store";

export default function Calculator({ option, value }) {
  const [futureValue, setFutureValue] = useRecoilState(futureValueState);
  const [presentValue, setPresentValue] = useRecoilState(presentValueState);
  const [interest, setInterest] = useRecoilState(interestState);
  const [periods, setPeriods] = useRecoilState(periodsState);
  const [payment, setPayment] = useRecoilState(paymentState);
  const [calculate, setCalculate] = useRecoilState(calculateState);
  const [isCalculated, setIsCalculated] = useRecoilState(isCalculatedState);

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

  const conv_number = (expr, decplaces) => {
    var str = "" + Math.round(eval(expr) * Math.pow(10,decplaces));
    while (str.length <= decplaces) {
      str = "0" + str;
    }
  
    var decpoint = str.length - decplaces;
    return (str.substring(0,decpoint) + "." + str.substring(decpoint,str.length));
  }

  const getPresentValue = (rate, nper, pmt, fv) => {
    let pv_value, x, y;
    rate = parseFloat(rate);
    nper = parseFloat(nper);
    pmt = parseFloat(pmt);
    fv = parseFloat(fv);
    if ( nper == 0 ) {
      alert("Why do you want to test me with zeros?");
      return(0);       
    }
    if ( rate == 0 ) { // Interest rate is 0
      pv_value = -(fv + (pmt * nper));
    } else {
      x = Math.pow(1 + rate, -nper); 
      y = Math.pow(1 + rate, nper);
      pv_value = - ( x * ( fv * rate - pmt + y * pmt )) / rate;
    }
    pv_value = conv_number(pv_value,2);
    return pv_value;
  }

  const getFutureValue = (rate, nper, pmt, pv) => {
    let fv_value, x, y;
    rate = parseFloat(rate);
    nper = parseFloat(nper);
    pmt = parseFloat(pmt);
    pv = parseFloat(pv);
    if ( nper == 0 ) {
      alert("Why do you want to test me with zeros?");
      return(0);
    }
    if ( rate == 0 ) { // Interest rate is 0
      fv_value = -(pv + (pmt * nper));
    } else {
      x = Math.pow(1 + rate, nper);
      fv_value = - ( -pmt + x * pmt + rate * x * pv ) /rate;
    }
    fv_value = conv_number(fv_value,2);
    return fv_value;
  }

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
      convertToDecimal(interest),
      periods.split(",").join(""),
      payment.split(",").join(""),
      futureValue.split(",").join("")
    );
    let fv = getFutureValue(
      convertToDecimal(interest),
      periods.split(",").join(""),
      payment.split(",").join(""),
      presentValue.split(",").join("")
    );
    let pmt = getPmt(
      convertToDecimal(parseFloat(interest)),
      parseFloat(periods), 
      parseFloat(presentValue), 
      parseFloat(futureValue)
    );
    let rate = getRate(
      parseFloat(periods.split(",").join("")),
      parseFloat(payment.split(",").join("")),
      parseFloat(presentValue.split(",").join("")),
      parseFloat(futureValue.split(",").join(""))
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
    setIsCalculated(false);
  };
  console.log(calculate);
  const clearItem = (event) => {
    const { id } = event.target;

    if (id === "Present Value") {
      setPresentValue("");
    } else if (id === "Future Value") {
      setFutureValue("");
    } else if (id === "Interest Rate") {
      setInterest("");
    } else if (id === "Payments") {
      setPayment("");
    } else if (id === "Periods") {
      setPeriods("");
    }
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
      functions: [handleChangeFV, handleChangeInterest, handleChangePayment, handleChangePeriods],
      value: [futureValue, interest, payment, periods],
      label: ["Future Value", "Interest Rate", "Payment", "Periods"],
    },
    FV: {
      functions: [handleChangePV, handleChangeInterest, handleChangePayment, handleChangePeriods],
      value: [presentValue, interest, payment, periods],
      label: ["Present Value", "Interest Rate", "Payment", "Periods"],
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
        handleChangePayment,
        handleChangePeriods,
      ],
      value: [futureValue, presentValue, payment, periods],
      label: ["Future Value", "Present Value", "Payment", "Periods"],
    },
  };

  return (
    <CalcWrapper isCalculated={isCalculated}>
      {value.map((item, idx) => {
        if (item === option) {
          return (
            <>
              <h1>{item} Calculator</h1>
              <Container>
                <InputContainer>
                  {test[item].functions.map((thing, index) => {
                    return (
                      <>
                        <Label for={test[item]}>
                          {test[item].label[index]}
                        </Label>
                        <Input
                          type="text"
                          id={test[item]}
                          value={test[item].value[index]}
                          onChange={thing}
                        />
                      </>
                    );
                  })}
                </InputContainer>
                <BtnContainer>
                  {test[item].label.map((step, index) => {
                    return (
                      <>
                        <Hidden htmlfor={step}>#</Hidden>
                        <DeleteBtn id={step} onClick={clearItem} />
                      </>
                    );
                  })}
                </BtnContainer>
              </Container>
            </>
          );
        } else {
          return null;
        }
      })}
      {isCalculated ? (
        <Button className="button" onClick={handleClear}>
          Reset
        </Button>
      ) : (
        <Button className="button" onClick={handleClick}>
          Calculate
        </Button>
      )}
      {parseInt(calculate) === 0 && isCalculated ? (
        <div style={{ color: "red" }}>
          <b>Please enter numeric values</b>
        </div>
      ) : (
        <Results
          calculation={calculate}
          option={option}
          isCalculated={isCalculated}
        />
      )}
    </CalcWrapper>
  );
}
 