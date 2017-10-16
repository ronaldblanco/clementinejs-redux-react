import React from 'react';
import PropTypes from 'prop-types'

const Input = ({ name }) => (
  <li>
    {name}
  </li>
)

Input.propTypes = {
  name: PropTypes.string.isRequired
}

export default Input;
