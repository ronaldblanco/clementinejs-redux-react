import React from 'react';
import Input from './Input.jsx';
import PropTypes from 'prop-types';

const Li = ({ datas }) => (
  <ul className="list-group" id="list" >
    {datas.map((data, index) =>
      <Input key={index} name={data.name} value={data.value} />
    )}
  </ul>
);

Li.propTypes = {
  datas: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default Li;
