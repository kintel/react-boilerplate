import React from 'react';
import {connect} from 'react-redux';
import {findLarge, largeFailure} from '../../modules/large';
import ValidatedSearch from '../../containers/ValidatedSearch';
import LargeInfo from '../../components/LargeInfo';

class LargeIndex extends React.Component {

  render() {
    return (
    <div>
    <h1>Large entities</h1>
      <ValidatedSearch
         placeholder="Large-nr"
         validator={(input) => input.match(/^[0-9]+$/) && input.length === 15}
         onSuccess={this.props.findLarge}
         onError={this.props.largeFailure}/>
      <LargeInfo {...this.props.large}/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    large: state.large
  };
};

const mapDispatchToProps = {
  findLarge,
  largeFailure
};

export default connect(mapStateToProps, mapDispatchToProps)(LargeIndex);
