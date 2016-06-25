import React, { Component, PropTypes } from 'react';
import {AccountsCollection} from '../api/AccountsCollection.js';
import {Grid, Row, Col} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';

// Task component - represents a collection of Accounts
export default class Accounts extends Component {

  renderAccountsHeader() {
    return (
      <Row>
        <Col md={1} xs={1}>Del</Col>
        <Col md={1} xs={1}>Fil</Col>
        <Col md={5} xs={5}>Account #</Col>
        <Col md={5} xs={5}><span className="pull-right">Balance</span></Col>
      </Row>
    );
  }

  renderAccounts() {
    return this.props.accounts.map((account) => (
      <Account key={account._id} account={account} />
    ));
  }

  render() {
    return (
      <div className="accountList">
        <h1>Accounts</h1>
        <label className="hide-zero-balance-accounts">
          <input
          type="checkbox"
          readOnly
          checked={this.props.hideZeroBalanceAccounts}
          onClick={this.toggleHideZeroBalanceAccounts.bind(this)}
          />
          &nbsp;Hide Zero Balance Accounts
        </label>
        <form className="new-account" onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            ref="textInput"
            placeholder="Enter new accounts here"
          />
        </form>
        <Grid fluid >
          {this.renderAccountsHeader()}
          {this.renderAccounts()}
        </Grid>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const accountNumber = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    AccountsCollection.insert({accountNumber: accountNumber, balance: 0, createdAt: new Date()});
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideZeroBalanceAccounts() {

  }

  hideZeroBalanceAccounts() {

  }

}

export default createContainer(() => {
  return {
    accounts: AccountsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, Accounts);

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  hideZeroBalanceAccounts: PropTypes.bool,
};
