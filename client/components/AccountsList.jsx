import React, { Component, PropTypes } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
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

AccountsList.propTypes = {
  accounts: PropTypes.array.isRequired,
  hideZeroBalanceAccounts: PropTypes.bool,
};
