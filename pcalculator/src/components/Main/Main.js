import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: Calc(100vh - 50px);
  display: flex;
  flex-direction: row;
  overflow: ${(props) => (props.isCalculated ? 'auto' : 'hidden')};
`;
