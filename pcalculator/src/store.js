import { atom } from 'recoil';

export const futureValueState = atom({
  key: 'futureValue',
  default: 0
});

export const presentValueState = atom({
  key: 'presentValue',
  default: 0
});

export const interestState = atom({
  key: 'interest',
  default: 0
});

export const periodsState = atom({
  key: 'periods',
  default: 1
});

export const paymentState = atom({
  key: 'payments',
  default: 0
});

export const calculateState = atom({
  key: 'calculate',
  default: 0
});

export const isCalculatedState = atom({
  key: 'isCalculated',
  default: false
});

export const optionState = atom({
  key: 'option',
  default: 'PV'
});

export const tableDataState = atom({
  key: 'data',
  default: []
});

export const contentState = atom({
  key: 'content',
  default: 'PV'
});
