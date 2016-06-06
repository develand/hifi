import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Account from './Account.jsx';
import {Accounts} from '../api/Accounts.js'
 
// App component - represents the whole app
export default class App extends Component {
 
  renderAccounts() {
    return this.props.accounts.map((account) => (
      <Account key={account._id} account={account} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>High Finance</h1>
        </header>
 
        <ul>
          {this.renderAccounts()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  accounts: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    accounts: Accounts.find({}).fetch()
  }
}, App);