import React, {Component} from 'react';
import AccountsContainer from '../containers/AccountsContainer.jsx';
import {IntlProvider} from 'react-intl';
import NavigationBar from './NavigationBar.jsx';

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <IntlProvider locale="en">
        <div>
          <NavigationBar />
          <AccountsContainer />
        </div>
      </IntlProvider>
    );
  }
}
