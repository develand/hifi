import React, {Component} from 'react';
import AccountsCollection from '/collections/AccountsCollection.js';
import AccountsList from '/client/components/AccountsList.jsx';
import AccountsQuickEntry from '/client/components/AccountsQuickEntry.jsx';

export default class AccountsContainer extends Component {

  render() {
    return (
      <div>
        <h1>Accounts</h1>
        <AccountsQuickEntry  onAddAccount={this.handleAddAccount.bind(this)} />
        <AccountsList />
      </div>
    );
  }

  handleAddAccount(accountNumber) {
    AccountsCollection.insert({accountNumber: accountNumber, balance: 0, createdAt: new Date()});
  }

}
