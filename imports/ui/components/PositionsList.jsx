import React, { Component, PropTypes } from 'react';
import { MeteorGriddle } from 'meteor/utilities:meteor-griddle';

// Component used to display a table of positions for an account
export default class PositionsList extends Component {

  render() {
    return (
        <
        <MeteorGriddle
            tableClassName='table'
            collection={this.props.accountsCollection}
            publication='accounts'
            showFilter={true}
            showSettings={true}
            columns={['accountNumber', 'balance']}
        />
    );
  }

}

PositionsList.propTypes = {
    accountsCollection: PropTypes.object.isRequired,
};
