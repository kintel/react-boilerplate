import React from 'react';
import {connect} from 'react-redux';
import SmallList from './SmallList';
import {findSmall} from '../../modules/small';

const mapStateToProps = (state) => {
  return {
    smallItems: state.small.smallItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSmallClick: (id) => { dispatch(findSmall(id, '/small/form')) }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmallList);
