import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Account extends Component {
  render() {
    return (
      <li>{this.props.account.text}</li>
    );
  }
}
 
Account.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  account: PropTypes.object.isRequired
};