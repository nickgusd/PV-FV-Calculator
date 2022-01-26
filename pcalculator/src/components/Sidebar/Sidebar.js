import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 200px;
  border: 1px solid black;
  background: #1c5253;
  min-height: 100vw;
  position: fixed;
  overflow: auto;
`;

export const Wrapper = styled.div`
  position: fixed;
  width: 200px;
  top: 50px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Tab = styled.div`
  height: 50px;
  border-bottom: 1px solid #757575;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  background: ${(props) => (props.active ? '#76B041' : '#1C5253')};
  cursor: pointer;
  user-select: none;
  text-decoration: none;
`;
