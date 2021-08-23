/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Results from '../Results/Results.jsx';
import {
  DeleteBtn,
  CalcWrapper,
  Button,
  Input,
  Label,
  InputContainer,
  Container,
  BtnContainer,
  Hidden,
} from './Calculator.style';

import {
  futureValueState,
  presentValueState,
  interestState,
  periodsState,
  paymentState,
  calculateState,
  isCalculatedState,
} from '../../store';

import {
  convertToDecimal,
  getPresentValue,
  getFutureValue,
  getPmt,
  getRate,
} from '../../helpers';

export default function Calculator({ option, value }) {
  const [futureValue, setFutureValue] = useRecoilState(futureValueState);
  const [presentValue, setPresentValue] = useRecoilState(presentValueState);
  const [interest, setInterest] = useRecoilState(interestState);
  const [periods, setPeriods] = useRecoilState(periodsState);
  const [payment, setPayment] = useRecoilState(paymentState);
  const [calculate, setCalculate] = useRecoilState(calculateState);
  const [isCalculated, setIsCalculated] = useRecoilState(isCalculatedState);

  useEffect(() => {
    setFutureValue('');
    setPresentValue('');
    setInterest('');
    setPeriods('');
    setCalculate('');
    setPayment('');
    setIsCalculated(false);
  }, [option]);

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
    const pv = getPresentValue(
      convertToDecimal(interest),
      periods.split(',').join(''),
      payment.split(',').join(''),
      futureValue.split(',').join(''),
    );
    const fv = getFutureValue(
      convertToDecimal(interest),
      periods.split(',').join(''),
      payment.split(',').join(''),
      presentValue.split(',').join(''),
    );
    const pmt = getPmt(
      convertToDecimal(parseFloat(interest)),
      parseFloat(periods),
      parseFloat(presentValue),
      parseFloat(futureValue),
    );
    const rate = getRate(
      parseFloat(periods.split(',').join('')),
      parseFloat(payment.split(',').join('')),
      parseFloat(presentValue.split(',').join('')),
      parseFloat(futureValue.split(',').join('')),
    );

    if (option === 'PV') {
      setCalculate(pv);
    } else if (option === 'FV') {
      setCalculate(fv);
    } else if (option === 'PMT') {
      setCalculate(pmt);
    } else {
      setCalculate((rate * 100).toFixed(2));
    }
    setIsCalculated(true);
  };

  const handleClear = () => {
    setIsCalculated(false);
  };

  const clearItem = (event) => {
    const { id } = event.target;

    if (id === 'Present Value') {
      setPresentValue('');
    } else if (id === 'Future Value') {
      setFutureValue('');
    } else if (id === 'Interest Rate') {
      setInterest('');
    } else if (id === 'Payment') {
      setPayment('');
    } else if (id === 'Periods') {
      setPeriods('');
    }
  };

  const test = {
    PV: {
      functions: [handleChangeFV, handleChangeInterest, handleChangePayment, handleChangePeriods],
      value: [futureValue, interest, payment, periods],
      label: ['Future Value', 'Interest Rate', 'Payment', 'Periods'],
    },
    FV: {
      functions: [handleChangePV, handleChangeInterest, handleChangePayment, handleChangePeriods],
      value: [presentValue, interest, payment, periods],
      label: ['Present Value', 'Interest Rate', 'Payment', 'Periods'],
    },
    PMT: {
      functions: [
        handleChangeFV,
        handleChangePV,
        handleChangeInterest,
        handleChangePeriods,
      ],
      value: [futureValue, presentValue, interest, periods],
      label: ['Future Value', 'Present Value', 'Interest Rate', 'Periods'],
    },
    Rate: {
      functions: [
        handleChangeFV,
        handleChangePV,
        handleChangePayment,
        handleChangePeriods,
      ],
      value: [futureValue, presentValue, payment, periods],
      label: ['Future Value', 'Present Value', 'Payment', 'Periods'],
    },
  };

  return (
    <CalcWrapper isCalculated={isCalculated}>
      {value.map((item) => {
        if (item === option) {
          return (
            <>
              <h1>
                {item}
                {' '}
                Calculator
              </h1>
              <Container>
                <InputContainer>
                  {test[item].functions.map((thing, index) => (
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
                  ))}
                </InputContainer>
                <BtnContainer>
                  {test[item].label.map((step) => (
                    <>
                      <Hidden htmlfor={step}>#</Hidden>
                      <DeleteBtn id={step} onClick={clearItem} />
                    </>
                  ))}
                </BtnContainer>
              </Container>
            </>
          );
        }
        return null;
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
        <div style={{ color: 'red' }}>
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
