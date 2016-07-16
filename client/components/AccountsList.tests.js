import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import AccountsList from './AccountsList.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import {IntlProvider} from 'react-intl';
import '/factories/account.js';

if (Meteor.isClient) {
  describe('Account List', () => {
    describe('Look & Feel', function() {
      let accountsListElem = null;

      beforeEach(() => {
        Factory.create('account');
        accountsListElem = mount(<IntlProvider locale="en"><AccountsList /></IntlProvider>);
      });

      it('contains an accountList class', () => {
        expect(accountsListElem.find(AccountsList).length);
      });

      it('displays an accounts row header with the proper labels', function() {
        const grid = accountsListElem.find(Grid);
        const headerRow = grid.find(Row).first();
        expect(headerRow.find(Col).at(0).text()).to.equal('');
        expect(headerRow.find(Col).at(1).text()).to.equal('Account #');
        expect(headerRow.find(Col).at(2).text()).to.equal('Balance');
      });
    });
  });
}
