import styled from 'styled-components';
import { Delete } from '@styled-icons/typicons/Delete';

export const Wrapper = styled.div``;

export const DeleteBtn = styled(Delete)`
  height: 21px;
  width: auto;
  margin: 15px;
  transform: scale(1.4);
  transition: all 0.2s ease-in-out;
  pointer-events: 'none' !important;
  border: 1px solid black;

  &:hover {
    transform: scale(1.7);
  }
`;

export const CalcWrapper = styled.div`
  text-align: center;
  width: 432px;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: ${(props) => (props.isCalculated ? '15px' : '0px')};
  border-radius: 6px;
  background: #1c5253;
  color: white;
  @media (max-width: 432px) {
    width: auto;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 260px;
  margin: 0 auto;
`;

export const Button = styled.button`
  margin-bottom: 20px !important;
  margin: 10px;
  background-color: ${(props) => (props.clear ? '#d62246' : '#76B041')};
  height: 25px;
  width: 100px;
  border: none;
  color: #fff;
  border-radius: 7px;
  font-size: 16px;
`;

export const Input = styled.input`
  width: 180px;
  margin: 15px;
`;

export const Label = styled.label``;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BtnContainer = styled(InputContainer)`
  width: 2vw;
`;

export const Hidden = styled(Label)`
  visibility: hidden;
`;
export const ClearBtn = styled.button`
  margin: 15px;
`;
