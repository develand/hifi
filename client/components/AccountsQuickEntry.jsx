import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
/***
* UI Component for handling the entry of an account number
***/
export default class AccountsQuickEntry extends Component {

  /***
  * Renders component
  ***/
  render() {
    return (
      <form className="accounts-quick-entry" onSubmit={this.handleSubmit.bind(this)}>
        Account #&nbsp;
        <input
          size="10"
          type="text"
          ref="textInput"
        />
      </form>
    );
  }

  /**
  * Handle entry of new account number
  * Input: event - the input submit event
  * Calls onAddAccount method passed from container and passes new account number
  * then clears out the entry field
  **/
  handleSubmit(event) {
    event.preventDefault();
    const accountNumber = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    this.props.onAddAccount(accountNumber);
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

}

AccountsQuickEntry.propTypes = {
  onAddAccount: PropTypes.func.isRequired,
};
