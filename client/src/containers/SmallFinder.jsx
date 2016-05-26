import React from 'react';
import {connect} from 'react-redux';
import {Input, ButtonInput} from 'react-bootstrap';
import {findSmall, failure} from '../modules/small';

const SmallInfo = ({small}) => {
  return (
      <ul>
      <li>Small-nr: {small._id}</li>
      <li>Optional key: {small.optionalKey}</li>
      <li>Some String: {small.someString}</li>
      <li>field1: {small.field1}</li>
      {small.field2 ? <li>Field2: {small.field2}</li> : ''}
      {small.field3 ? <li>Field3: {small.field3}</li> : ''}
      </ul>
  );
};

const initialState = {
  input: ''
};

class SmallFinder extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = initialState;
  }

  componentDidMount() {
    // Focus if we don't yet have a small state
    // FIXME: We can prob. remove this: We're using autofocus
//    if (!this.props.small) this.refs.input.getInputDOMNode().focus();
  }

  componentDidUpdate() {
// FIXME: This was an attempt at clearing the field on refresh, which didn't work
//    if (this.props.small && this.state.input) this.setState(initialState);
  }

  handleSmallSearchChange() {
    this.setState({
      input: this.refs.input.getValue()
    });
  }

  submitSmallSearch(e) {
    e.preventDefault();
    console.log(`submit: Small = ${this.state.input}`);
    if (this.SmallSearchIsValid()) {
      this.props.findSmall(this.state.input);
    }
    else { // select all to get rid of garbage after mis-scans
      this.refs.input.getInputDOMNode().select();
      this.props.failure("validation error");
    }
  }

  SmallSearchIsValid() {
    const val = this.state.input;
    return val.match(/^[0-9]+$/) && (val.length === 8 || val.length === 20);
  }
  
  validateSmallSearch() {
    return this.SmallSearchIsValid() ? 'success' : 'error';
  }

  render() {
    return <div>
      <form className="form-inline" onSubmit={this.submitSmallSearch.bind(this)}>
        <Input ref="input"
               style={{width: "20em"}}
               type="text"
               autoComplete="off"
               autoFocus={true}
               id="input"
               name="input"
               placeholder="Small-nr eller tlf.-nr"
               onChange={this.handleSmallSearchChange.bind(this)}
               value={this.state.input}
               bsStyle={this.validateSmallSearch()}/>
        <ButtonInput type="submit" bsStyle="primary" style={{marginLeft:10}}>Finn Small-kort</ButtonInput>
      </form>
    {this.props.small ? <SmallInfo small={this.props.small}/> : ''}
    {this.props.error ? <p style={{color: "red"}}>{this.props.error}</p> : ''}
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    small: state.small.small,
    error: state.small.error
  };
};

const mapDispatchToProps = {
  findSmall,
  failure
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmallFinder);
