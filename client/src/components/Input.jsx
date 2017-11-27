import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, key, value }) => (
  <li className="list-group-item list-group-item-info" key={key} >
    <label>
      <input type="radio" value={name} name="radioData" id="radioData" />
        {name}->{value}
    </label>
  </li>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  key: PropTypes.number,
  value: PropTypes.string,
};

export default Input;
