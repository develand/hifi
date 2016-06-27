import React, {Component} from 'react';
import Accounts from './Accounts.jsx';
import {IntlProvider} from 'react-intl';
import NavigationBar from './NavigationBar.jsx';

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <IntlProvider locale="en">
        <div className="container">
          <NavigationBar />
          <header>
            <Accounts />
          </header>
        </div>
      </IntlProvider>
    );
  }
}
