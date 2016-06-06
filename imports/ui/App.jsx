import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import Account from './Account.jsx';
import {Accounts} from '../api/Accounts.js'
 
// App component - represents the whole app
export default class App extends Component {
 
  renderAccounts() {
    return this.props.accounts.map((account) => (
      <Account key={account._id} account={account} />
    ));
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Accounts.insert({text: text, createdAt: new Date()});

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Accounts</h1>
          <form className="new-account" onSubmit={this.handleSubmit.bind(this)}>
            <input 
              type="text"
              ref="textInput"
              placeholder="Enter new accounts here"
            />
          </form>
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
    accounts: Accounts.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, App);