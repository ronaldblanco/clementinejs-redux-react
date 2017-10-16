import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, key }) => (
  <li className="list-group-item list-group-item-info" key={key} >
    {name}
  </li>
);

Input.propTypes = {
  name: PropTypes.string.isRequired
};

export default Input;
