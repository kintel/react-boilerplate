import React from 'react';
import {connect} from 'react-redux';
import LargeList from './LargeList';
import {findLarge} from '../../modules/large';

const mapStateToProps = (state) => {
  return {
    largeItems: state.large.largeItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLargeClick: (id) => { dispatch(findLarge(id, '/large/form')) }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LargeList);
