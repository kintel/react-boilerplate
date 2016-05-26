import React from 'react';
import {Input, ButtonInput} from 'react-bootstrap';

export default class ValidatedSearch extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      input: ''
    };
  }

  clear() {
    this.setState({ input: '' });
  }

  focus() {
    console.log(`focus: ${this.refs.input.getInputDOMNode()}`);
    this.refs.input.getInputDOMNode().focus();
  }

  onChange() {
    this.setState({ input: this.refs.input.getValue() });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(`submit: ${this.state.input}`);
    if (this.props.validator && !this.props.validator(this.state.input)) {
      // select all to get rid of garbage after mis-scans
      this.refs.input.getInputDOMNode().select();
      this.props.onError("validation error");
    }
    else {
      this.props.onSuccess(this.state.input);
    }
  }

  validateSearch() {
    return this.props.validator ? this.props.validator(this.state.input) ? 'success' : 'error' : '';
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.onSubmit.bind(this)}>
        <Input {...this.props}
               ref="input"
               style={{width: "20em"}}
               type="text"
               autoComplete="off"
               id="input"
               name="input"
               onChange={this.onChange.bind(this)}
               value={this.state.input}
               bsStyle={this.validateSearch()}/>
        <ButtonInput type="submit" bsStyle="primary" style={{marginLeft:10}}>{this.props.submitText}</ButtonInput>
      </form>
    );
  }
}

ValidatedSearch.defaultProps = {
  submitText: 'Finn'
}
