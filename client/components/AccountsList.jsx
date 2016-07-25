import React, { Component, PropTypes } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Account from './Account.jsx';

// Task component - represents a collection of Accounts
export default class AccountsList extends Component {

  renderAccountsHeader() {
    return (
      <Row className="accounts-header">
        <Col md={1} xs={1}/>
        <Col md={4} xs={4}>Account</Col>
        <Col md={4} xs={4}><span className="pull-right">Balance</span></Col>
        <Col md={1} xs={1}></Col>
      </Row>
    );
  }

  renderAccounts() {
    return this.props.accounts.map((account) => (
      <Account key={account._id} account={account} 
        onDeleteAccount={this.props.onDeleteAccount}
        onSelectAccount={this.props.onSelectAccount}
      />
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
  onDeleteAccount: PropTypes.func.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
};
