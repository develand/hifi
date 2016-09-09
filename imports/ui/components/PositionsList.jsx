import React, { Component, PropTypes } from 'react';
import { MeteorGriddle } from 'meteor/utilities:meteor-griddle';

// Component used to display a table of positions for an account
export default class PositionsList extends Component {

  render() {
    return (
        <MeteorGriddle
            collection={this.props.accountsCollection}
            publication='accounts'
            columns={['accountNumber', 'balance']}
        />
    );
  }

}

PositionsList.propTypes = {
    accountsCollection: PropTypes.object.isRequired,
};
