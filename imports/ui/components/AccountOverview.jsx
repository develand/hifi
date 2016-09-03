import React, { Component, PropTypes } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

// Task component - represents a single todo item
export default class AccountOverview extends Component {

  renderAccountsHeader() {
    return (
      <Row>
        <Col md={4} xs={4}>Account</Col>
        <Col md={4} xs={4}><span className="pull-right">Balance</span></Col>
      </Row>
    );
  }

  renderAccounts() {
    return this.props.accounts.map((account) => (
      <Row key={account._id}>
        <Col md={4} xs={4}>{account.accountNumber}</Col>
        <Col md={4} xs={4}><span className="pull-right">{account.balance}</span></Col>
      </Row>
    ));
  }

  render() {
    return (
      <div className="accounts-overview-list">
        <Grid fluid >
          {this.renderAccountsHeader()}
          {this.renderAccounts()}
        </Grid>
      </div>
    );
  }
}

AccountOverview.propTypes = {
  accounts: PropTypes.array.isRequired,
};
