/* eslint-disable react/button-has-type */
import React from 'react';

import { useHistory } from 'react-router-dom';

const headerStyle = {
  textAlign: 'center',
  fontSize: '200px',
  color: '#1C5253',
  marginBottom: '0px'
};

const header2Style = {
  textAlign: 'center',
  color: '#1C5253',
  fontSize: '20px',
  marginBottom: '20px',
  marginTop: '0px'
};

const buttonStyle = {
  display: 'block',
  margin: '0 auto',
  background: '#1C5253',
  color: 'white',
  height: '40px',
  fontWeight: 'bold',
  borderRadius: '4px'
};

export default function NotFound() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div>
      <h1 style={headerStyle}>404</h1>
      <h2 style={header2Style}>Page not found!</h2>
      <button onClick={handleClick} style={buttonStyle}>
        Return Home
      </button>
    </div>
  );
}
