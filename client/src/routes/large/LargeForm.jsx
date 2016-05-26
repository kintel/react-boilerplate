import React from 'react';
import {connect} from 'react-redux'
import {Button, Input} from 'react-bootstrap';

export default class LargeForm extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
    <div>
    <h1>Large Single</h1>
    <Input type="text" label="Large Nr" value={this.props.large._id}/>
    <Input type="text" label="Field1" value={this.props.large.field1}/>
    <Input type="text" label="Field2" value={this.props.large.field2}/>
    <Input type="text" label="Field3" value={this.props.large.field3}/>
    <Input type="text" label="Status" value={this.props.large.status}/>
    <Input type="text" label="Small"  value={this.props.large.small}/>
    <Button bsStyle="default">Show</Button>
    <Button bsStyle="success" onClick={this.props.save}>Save</Button>
    <Button bsStyle="warning" onClick={this.props.cancel}>Cancel</Button>
    </div>
    );
  }
}
