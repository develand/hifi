import React, { Component, PropTypes } from 'react';
import {AccountsCollection} from '/collections/AccountsCollection.js';
import {Row, Col} from 'react-bootstrap';
import {FormattedNumber} from 'react-intl';

// Task component - represents a single todo item
export default class Account extends Component {

  render() {
    return (
        <Row>
          <Col md={1} xs={1}>
            <input
              type="checkbox"
              readOnly
              checked={this.props.account.checked}
              onClick={this.toggleChecked.bind(this)}
            />
          </Col>
          <Col md={4} xs={4} className="accountNumber">{this.props.account.accountNumber}</Col>
          <Col md={4} xs={4} className="balance">
            <span className="pull-right">
              <FormattedNumber style="currency" currency="USD"
                value={this.props.account.balance ? this.props.account.balance : 0.00}/>
            </span>
          </Col>
          <Col md={1} xs={1}>
            <button className="delete">&times;</button>
          </Col>
        </Row>
    );
  }

  deleteThisAccount() {
    this.props.onDeleteAccount();
  }

  toggleChecked() {
    onSelectAccount(this.props.account.checked);
  }
}

Account.propTypes = {
  account: PropTypes.object.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
};
