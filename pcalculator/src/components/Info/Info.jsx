import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, TextContainer } from '../Info/Info.style';

import config from '../../config/content.json';

export default function Info({ option }) {
  return (
    <Wrapper>
      <TextContainer>{config[option]}</TextContainer>
    </Wrapper>
  );
}

Info.propTypes = {
  option: PropTypes.string
};
