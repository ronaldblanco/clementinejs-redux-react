import React from 'react';
import Input from './Input.jsx';
import PropTypes from 'prop-types';

const Li = ({ datas }) => (
  <ul className="list-group" id="list" >
    {datas.map(data =>
      <Input  name={data.name}  />
    )}
  </ul>
);

Li.propTypes = {
  datas: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default Li;