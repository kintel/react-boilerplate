import React from 'react';
import {connect} from 'react-redux';
import {Input, ButtonInput} from 'react-bootstrap';
import {findLarge, failure} from '../modules/large';

const LargeInfo = ({large}) => {
  return (
    <ul>
      <li>Large-nr: {large._id}</li>
      <li>field1: {large.field1}</li>
      <li>field2: {large.field2}</li>
      <li>field3: {large.field3}</li>
    </ul>
  );
};

const initialState = {
  input: ''
};

class LargeFinder extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = initialState;
  }

  componentDidMount() {
    // Focus if we don't yet have a large state
    // FIXME: We can prob. remove this: We're using autofocus
//    if (!this.props.large) this.refs.input.getInputDOMNode().focus();
  }

  componentDidUpdate() {
// FIXME: This was an attempt at clearing the field on refresh, which didn't work
//    if (this.props.large && this.state.input) this.setState(initialState);
  }

  handleLargeSearchChange() {
    this.setState({
      input: this.refs.input.getValue()
    });
  }

  submitLargeSearch(e) {
    e.preventDefault();
    console.log(`Large field: ${this.state.input}`);
    if (this.LargeSearchIsValid()) {
      this.props.findLarge(this.state.input);
    }
    else { // to get rid of garbage after mis-scans
      this.refs.input.getInputDOMNode().select();
      this.props.failure("validation error");
    }
  }

  LargeSearchIsValid() {
    const val = this.state.input;
    return val.match(/^[0-9]+$/) && (val.length === 4 || val.length === 15);
  }
  
  validateLargeSearch() {
    return this.LargeSearchIsValid() ? 'success' : 'error';
  }

  render() {
    return <div>
      <form className="form-inline" onSubmit={this.submitLargeSearch.bind(this)}>
        <Input ref="input"
               style={{width: "20em"}}
               type="text"
               autoComplete="off"
               autoFocus={true}
               id="input"
               name="input"
               placeholder="Large-nr eller enhets-ID"
               onChange={this.handleLargeSearchChange.bind(this)}
               value={this.state.input}
               bsStyle={this.validateLargeSearch()}/>
        <ButtonInput type="submit" bsStyle="primary" style={{marginLeft:10}}>Finn MVA-enhet</ButtonInput>
      </form>
    {this.props.large ? <LargeInfo large={this.props.large}/> : ''}
    {this.props.error ? <p style={{color: "red"}}>{this.props.error}</p> : ''}
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    large: state.large.large,
    error: state.large.error
  };
};

const mapDispatchToProps = {
  findLarge,
  failure
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LargeFinder);
