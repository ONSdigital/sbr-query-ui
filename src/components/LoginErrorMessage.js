import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

const ErrorMessage = (props) => {
  const textAlign = {
    textAlign: 'center',
    margin: 'auto',
    width: '65%',
  };
  return (props.errorMessage ?
  (<ListGroup style={textAlign}>
    <p className="background--prim">{props.errorMessage}</p>
  </ListGroup>) : (<div></div>)
  );
};


ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    errorMessage: state.login.errorMessage,
  };
}

export default connect(select)(ErrorMessage);
