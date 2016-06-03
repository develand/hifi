import React, { Component } from 'react';
 
import Account from './Account.jsx';
 
// App component - represents the whole app
export default class App extends Component {
  getAccounts() {
    return [
      { _id: 1, text: 'C234223423' },
      { _id: 2, text: 'C123123131' },
      { _id: 3, text: 'C888234232' },
    ];
  }
 
  renderAccounts() {
    return this.getAccounts().map((account) => (
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