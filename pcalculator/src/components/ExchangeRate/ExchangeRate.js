import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px;
  width: 200px;
  border: 1px solid black;
  background: #1c5253;
  min-height: 100vw;
  position: fixed;
  //   margin-top: 40px;
  left: Calc(100% - 280px);
  //   overflow: auto;
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  //   align-items: center;
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
