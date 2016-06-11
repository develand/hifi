import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import Account from './Account.jsx';
import {Accounts} from '../api/Accounts.js';
import {Grid} from 'react-bootstrap';
import {IntlProvider} from 'react-intl';

 
// App component - represents the whole app
export default class App extends Component {
 
  renderAccounts() {
    return this.props.accounts.map((account) => (
      <Account key={account._id} account={account} />
    ));
  }

  renderAccountsHeader() {
    return (
      <Row>
        <Col md={1}>Mark</Col>
        <Col md={1}>Hide</Col>
        <Col md={5}>Account #</Col>
        <Col md={5}>Balance</Col>
      </Row>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const accountNumber = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Accounts.insert({accountNumber: accountNumber, balance: 0, createdAt: new Date()});

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  hideZeroBalanceAccounts() {

  }
 
  render() {
    return (
      <IntlProvider locale="en">
        <div className="container">
          <header>
            <h1>Accounts</h1>
            <label className="hide-complated">
              <input
                type="checkbox"
                readOnly
                checked={this.props.hideZeroBalanceAccounts}
                onClick={this.toggleHideZeroBalanceAccounts}
              />
              Hide Zero Balance Accounts
            </label>
            <form className="new-account" onSubmit={this.handleSubmit.bind(this)}>
              <input 
                type="text"
                ref="textInput"
                placeholder="Enter new accounts here"
              />
            </form>
          </header>
   
          <Grid>
            {this.renderAccountsHeader()}
            {this.renderAccounts()}
          </Grid>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  accounts: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    accounts: Accounts.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, App);