import React, { Component, PropTypes } from 'react';
import { AccountsCollection } from '/collections/AccountsCollection.js';
import AccountsList from '/imports/ui/components/AccountsList.jsx';
import AccountsQuickEntry from '/imports/ui/components/AccountsQuickEntry.jsx';
import {Panel} from 'react-bootstrap';

export default class AccountsContainer extends Component {

  /**
  * Renders the display of a single account
  **/
  render() {
    return (
      <Panel className="accounts-container">
        <h1>Accounts</h1>
        <AccountsQuickEntry
          onAddAccount={this.handleAddAccount.bind(this)}
        />
        <AccountsList accounts={this.props.accounts}
          onDeleteAccount={this.handleDeleteAccount.bind(this)}
          onSelectAccount={this.handleSelectAccount.bind(this)}
        />
      </Panel>
    );
  }

  /**
  * Adds a new account
  **/
  handleAddAccount(accountNumber) {
    AccountsCollection.insert({accountNumber: accountNumber, balance: 200, createdAt: new Date()});
  }

  /**
  * Deletes an account based on account id
  **/
  handleDeleteAccount(id) {
    AccountsCollection.remove(id);
  }

  /**
  * Toggles the selection of an account
  **/
  handleSelectAccount(id, checked) {
    AccountsCollection.update(id, {
      $set: {selected: !checked},
    });
  }
}

AccountsContainer.propTypes = {
  accounts: PropTypes.array.isRequired,
};




