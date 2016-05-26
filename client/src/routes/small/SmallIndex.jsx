import React from 'react';
import {connect} from 'react-redux';
import {findSmall, smallFailure} from '../../modules/small';
import ValidatedSearch from '../../containers/ValidatedSearch';
import SmallInfo from '../../components/SmallInfo';

class SmallIndex extends React.Component {

  render() {
    return <div>
      <h1>Small entities</h1>
      <ValidatedSearch
         placeholder="Small-nr or optional key"
         validator={(input) => input.match(/^[0-9]+$/) && (input.length === 8 || input.length === 20)}
         onSuccess={this.props.findSmall}
         onError={this.props.smallFailure}/>
      <SmallInfo {...this.props.small}/>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    small: state.small
  };
};

const mapDispatchToProps = {
  findSmall,
  smallFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallIndex);
