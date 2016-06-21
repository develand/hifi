import React, { Component, PropTypes } from 'react';
import {AccountsCollection} from '../api/AccountsCollection.js';
import {Row, Col} from 'react-bootstrap';
import {FormattedNumber} from 'react-intl';

// Task component - represents a single todo item
export default class Account extends Component {

  render() {
    // const accountClassName = this.props.account.checked ? 'checked' : '';

    return (
        <Row>
          <Col md={1} xs={1}>
            <button className="delete" onClick={this.deleteThisAccount.bind(this)}>
              &times;
            </button>
          </Col>
          <Col md={1} xs={1}>
            <input
              type="checkbox"
              readOnly
              checked={this.props.account.checked}
              onClick={this.toggleChecked.bind(this)}
            />
          </Col>
          <Col md={5} xs={5} className="accountNumber">{this.props.account.accountNumber}</Col>
          <Col md={5} xs={5} className="balance">
            <span className="pull-right">
              <FormattedNumber style="currency" currency="USD"
                value={this.props.account.balance ? this.props.account.balance : 0.00}/>
            </span>
          </Col>
        </Row>
    );
  }

  deleteThisAccount() {
    Accounts.remove(this.props.account._id);
  }

  toggleChecked() {
    AccountsCollection.update(this.props.account._id, {
      $set: {checked: !this.props.account.checked},
    });
  }
}

Account.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  account: PropTypes.object.isRequired,
};
