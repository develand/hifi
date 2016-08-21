import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { AccountsCollection } from '/collections/AccountsCollection.js';
import AccountsList from '/imports/ui/components/AccountsList.jsx';
import AccountsQuickEntry from '/imports/ui/components/AccountsQuickEntry.jsx';
import {Panel} from 'react-bootstrap';

export default class AccountsContainer extends Component {

  /***
  * Renders the display of a single account
  ***/
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

  /***
  * Adds a new account
  ***/
  handleAddAccount(accountNumber) {
    console.log("adding account in container: " + accountNumber);
    AccountsCollection.insert({accountNumber: accountNumber, balance: 200, createdAt: new Date()});
  }

  /***
  * Deletes an account based on account id
  ***/
  handleDeleteAccount(id) {
    AccountsCollection.remove(id);
  }

  /***
  * Toggles the selection of an account
  ***/
  handleSelectAccount(id, checked) {
    AccountsCollection.update(id, {
      $set: {selected: !checked},
    });
  }
}

AccountsContainer.propTypes = {
  accounts: PropTypes.array.isRequired,
};

// export default AccountsDataContainer = createContainer(() => {
//   if (Meteor.subscribe('accounts').ready()) {
//     console.log("Accounts client length: " + AccountsCollection.find({}).count());
//     return {
//       accounts: AccountsCollection.find({}, {sort: {accountNumber: 1}}).fetch(),
//     };
//   } else {
//     console.log('Accounts collection not ready...');
//     return {
//       accounts: [],
//     };
//   }
// }, AccountsContainer);



