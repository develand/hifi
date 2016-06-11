import React, {Component, PropTypes} from 'react';
import Account from './Account.jsx';
import {Accounts} from "../api/accounts.js";
import {createContainer} from 'meteor/react-meteor-data';
 
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
  let accountList = Accounts.find({}).fetch();
  console.log("List: " + accountList.length);
  return {
    accounts: accountList
  }
}, App);
