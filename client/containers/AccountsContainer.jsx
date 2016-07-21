import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { AccountsCollection } from '/collections/AccountsCollection.js';
import AccountsList from '/client/components/AccountsList.jsx';
import AccountsQuickEntry from '/client/components/AccountsQuickEntry.jsx';
import {Panel} from 'react-bootstrap';

export class AccountsContainer extends Component {

  render() {
    return (
      <Panel className="accounts-container">
        <h1>Accounts</h1>
        <AccountsQuickEntry  onAddAccount={this.handleAddAccount.bind(this)} />
        <AccountsList accounts={this.props.accounts}/>
      </Panel>
    );
  }

  handleAddAccount(accountNumber) {
    AccountsCollection.insert({accountNumber: accountNumber, balance: 0, createdAt: new Date()});
  }
}

AccountsContainer.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default AccountsDataContainer = createContainer(() => {
  if (Meteor.subscribe('accounts').ready()) {
    console.log("Accounts client length: " + AccountsCollection.find({}).count());
    return {
      accounts: AccountsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    };
  } else {
    console.log('Accounts collection not ready...');
    return {
      accounts: [],
    };
  }
}, AccountsContainer);



