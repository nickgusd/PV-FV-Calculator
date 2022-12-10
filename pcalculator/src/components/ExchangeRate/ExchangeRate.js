import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px;
  width: 200px;
  border: 1px solid black;
  background: #1c5253;
  min-height: 100vw;
  position: fixed;
  left: Calc(100% - 280px);
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

export const RatesWrapper = styled.div`
  padding: 24px;
  border: 1px solid white;
  background: white;
  color: black;
  height: 50vh;
  border-radius: 6px;
  overflow: auto;
`;

export const List = styled.div`
  padding: 14px;
`;

export const Caption = styled.div`
  padding: 8px;
  text-align: center;
`;

export const Currency = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
`;

export const Rate = styled.span`
  color: green;
`;
