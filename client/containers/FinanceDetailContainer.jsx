import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { AccountsCollection } from '/collections/AccountsCollection.js';
import {Panel, Tabs, Tab} from 'react-bootstrap';

export class FinanceDetailContainer extends Component {

  render() {
    return (
      <Panel className="finance-detail-container">
        <Tabs id="finance-detail-container">
          <Tab className="finance-detail-tab" eventKey={1} title="Overview">
            <h2>Overview</h2>
          </Tab>
          <Tab eventKey={2} title="Trends">Trends</Tab>
        </Tabs>  
      </Panel>
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
