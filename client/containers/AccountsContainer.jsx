import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { AccountsCollection } from '/collections/AccountsCollection.js';
import AccountsList from '/client/components/AccountsList.jsx';
import AccountsQuickEntry from '/client/components/AccountsQuickEntry.jsx';

export class AccountsContainer extends Component {

  render() {
    return (
      <div className="accounts-container">
        <h1>Accounts</h1>
        <AccountsQuickEntry  onAddAccount={this.handleAddAccount.bind(this)} />
        <AccountsList accounts={this.props.accounts}/>
      </div>
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
  const accountsHandle = Meteor.subscribe('accounts');
  const isLoading = accountsHandle.ready();
  const accountsExist = !isLoading;

  return {
    accounts: accountsExist ? AccountsCollection.find({}, {sort: {createdAt: -1}}).fetch() : [],
  };
}, AccountsContainer);
