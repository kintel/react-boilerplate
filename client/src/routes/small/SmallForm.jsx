import React from 'react';
import {connect} from 'react-redux'
import {Button, Input} from 'react-bootstrap';

export default class SmallForm extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
    <div>
    <h1>Small Single</h1>
    <Input type="text" label="Small Nr" value={this.props.small._id}/>
    <Input type="text" label="Field2" value={this.props.small.field2}/>
    <Input type="text" label="Optional key" value={this.props.small.optionalKey}/>
    <Input type="text" label="Field3" value={this.props.small.field3}/>
    <Input type="text" label="Large"  value={this.props.small.large}/>
    <Button bsStyle="default">Show</Button>
    <Input type="text" label="Some String" value={this.props.small.someString}/>
    <Button bsStyle="success" onClick={this.props.save}>Save</Button>
    <Button bsStyle="warning" onClick={this.props.cancel}>Cancel</Button>
    </div>
    );
  }
}
