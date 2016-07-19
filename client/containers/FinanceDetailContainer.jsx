import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { AccountsCollection } from '/collections/AccountsCollection.js';

export class FinanceDetailContainer extends Component {

  render() {
    return (
      <div className="finance-detail-container">
      </div>
    );
  }

  handleAddAccount(accountNumber) {
    AccountsCollection.insert({accountNumber: accountNumber, balance: 0, createdAt: new Date()});
  }
}

FinanceDetailContainer.propTypes = {
};

export default AccountsDataContainer = createContainer(() => {
  const accountsHandle = Meteor.subscribe('accounts');
  const isLoading = accountsHandle.ready();
  const accountsExist = !isLoading;

  return {
    accounts: accountsExist ? AccountsCollection.find({}, {sort: {createdAt: -1}}).fetch() : [],
  };
}, FinanceDetailContainer);
