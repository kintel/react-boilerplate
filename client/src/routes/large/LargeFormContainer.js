import React from 'react';
import {connect} from 'react-redux';
import LargeForm from './LargeForm';

const mapStateToProps = (state) => {
  return {
    large: state.large.large
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
//    toMova: dispatch({}),
//    save: dispatch({}),
//    cancel: dispatch({})
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LargeForm);
