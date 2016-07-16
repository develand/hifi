import React, { Component, PropTypes } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';
import {AccountsCollection} from '/collections/AccountsCollection';
import Account from './Account.jsx';

// Task component - represents a collection of Accounts
export default class AccountsList extends Component {

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
      <div className="accounts-list">
        <Grid fluid >
          {this.renderAccountsHeader()}
          {this.renderAccounts()}
        </Grid>
      </div>
    );
  }

}

export default AccountsDataContainer = createContainer(() => {
  const accountsHandle = Meteor.subscribe('accounts');
  const isLoading = accountsHandle.ready();
  const accountsExist = !isLoading;

  return {
    accounts: accountsExist ? AccountsCollection.find({}, {sort: {createdAt: -1}}).fetch() : [],
  };
}, AccountsList);

AccountsList.propTypes = {
  accounts: PropTypes.array.isRequired,
  hideZeroBalanceAccounts: PropTypes.bool,
};
