import { composeWithTracker } from 'react-komposer';
import { AccountsCollection } from '/collections/AccountsCollection.js';
import { Accounts } from '/client/components/Accounts.jsx';

export default class AccountsContainer extends Component {

  handleAddAccount = (accountNumber) => {
    AccountsCollection.insert({accountNumber: accountNumber, balance: 0, createdAt: new Date()});
  }

  render() {
    return(
      <div>
        <h1>Accounts</h1>
        <AccountsQuickEntry  onAddAccount={this.handleAddAccount.bind(this)}/>
        <AccountsList />
      </div>
    );
  }

};
