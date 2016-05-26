import React from 'react';
import {connect} from 'react-redux';
import SmallForm from './SmallForm';

const mapStateToProps = (state) => {
  return {
    small: state.small.small
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
//    toMova: dispatch({}),
//    save: dispatch({}),
//    cancel: dispatch({})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmallForm);
