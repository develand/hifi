import React, {Component} from 'react';
import AccountsContainer from '../containers/AccountsContainer.jsx';
import FinanceDetailContainer from '../containers/FinanceDetailContainer.jsx';
import {IntlProvider} from 'react-intl';
import NavigationBar from './NavigationBar.jsx';
import {Grid, Row, Col} from 'react-bootstrap';

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
                <AccountsContainer />
              </Col>
              <Col md={8}>
                <FinanceDetailContainer />
              </Col>
            </Row>
          </Grid>
        </div>
      </IntlProvider>
    );
  }
}
