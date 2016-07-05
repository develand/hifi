import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {AccountsCollection} from '../api/AccountsCollection.js';
import {Grid, Row, Col} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';
import Account from './Account.jsx';

// Task component - represents a collection of Accounts
export default class Accounts extends Component {

  renderAccountsHeader() {
    return (
      <Row className="accounts-header">
        <Col md={1} xs={1}/>
        <Col md={5} xs={6}>Account #</Col>
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
      <div className="account-list">
        <h1>Accounts</h1>
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

}

export default AccountsContainer = createContainer(() => {
  const accountsHandle = Meteor.subscribe('accounts');
  const isLoading = accountsHandle.ready();
  const accountsExist = !isLoading;
  const accounts = AccountsCollection.find({}, {sort: {createdAt: -1}}).fetch();

  return {
    accounts: accountsExist ? accounts : [],
  };
}, Accounts);

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  hideZeroBalanceAccounts: PropTypes.bool,
};
