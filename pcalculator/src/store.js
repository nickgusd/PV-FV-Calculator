import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

// const [futureValue, setFutureValue] = useState(0);
//   const [presentValue, setPresentValue] = useState(0);
//   const [interest, setInterest] = useState(0);
//   const [periods, setPeriods] = useState(0);
//   const [payment, setPayment] = useState(0);
//   const [calculate, setCalculate] = useState(0);
//   const [isCalculated, setIsCalculated] = useState(false);


export const futureValueState = atom({
key: "futureValue",
default: 0
});

export const presentValueState = atom({
    key: "presentValue",
    default: 0
});

export const interestState = atom({
    key: "interest",
    default: 0
});

export const periodsState= atom({
    key: "periods",
    default: 0
});

export const paymentState = atom({
    key: "payments",
    default: 0
});

export const calculateState = atom({
    key: "calculate",
    default: 0
});

export const isCalculatedState = atom({
    key: "isCalculated",
    default: false
});

export const currentPVState = selector({
    key: "roundPV",
    get: ({get}) => {
        const pv = get(presentValueState);
        return pv + 5
    }
});