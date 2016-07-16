import React, {Component, PropTypes} from 'react';

export default class AccountsQuickEntry extends Component {

  render() {
    return (
      <form className="accounts-quick-entry" onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          ref="textInput"
          placeholder="Enter new accounts here"
          onChange={this.handleSubmit.bind(this)}
        />
      </form>
    );
  }

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
