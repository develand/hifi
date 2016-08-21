import React, { Component, PropTypes } from 'react';
import AccountsContainer from '../containers/AccountsContainer.jsx';
import FinanceDetailContainer from '../containers/FinanceDetailContainer.jsx';
import { IntlProvider } from 'react-intl';
import { createContainer } from 'meteor/react-meteor-data';
import NavigationBar from '../components/NavigationBar.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import {AccountsCollection} from '/collections/AccountsCollection.js';

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <IntlProvider locale="en">
        <div>
          <NavigationBar />
          <Grid fluid>
            <Row>
              <Col md={4}>
                <AccountsContainer accounts={this.props.accounts}/>
              </Col>
              <Col md={8}>
                <FinanceDetailContainer accounts={this.props.accounts}/>
              </Col>
            </Row>
          </Grid>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default AccountsDataContainer = createContainer(() => {
  if (Meteor.subscribe('accounts').ready()) {
    console.log("Accounts client length: " + AccountsCollection.find({}).count());
    return {
      accounts: AccountsCollection.find({}, {sort: {accountNumber: 1}}).fetch(),
    };
  } else {
    console.log('Accounts collection not ready...');
    return {
      accounts: [],
    };
  }
}, App);