import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import Accounts from '../imports/ui/Accounts.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import {IntlProvider} from 'react-intl';
import '../factories/account.js';

if (Meteor.isClient) {
  describe('Account List', () => {
    describe('Look & Feel', function() {
      let accountsElem = null;

      beforeEach(() => {
        Factory.create('account');
        accountsElem = mount(<IntlProvider locale="en"><Accounts /></IntlProvider>);
      });

      it('contains an accountList class', () => {
        expect(accountsElem.find('accountsList').length);
      });

      it('displays an account list H1 header labeled "Accounts"', function() {
        expect(accountsElem.find('h1').at(0).text()).to.equal('Accounts');
      });

      it('displays an accounts row header with the proper labels', function() {
        const grid = accountsElem.find(Grid);
        const headerRow = grid.find(Row).first();
        expect(headerRow.find(Col).at(0).text()).to.equal('');
        expect(headerRow.find(Col).at(1).text()).to.equal('Account #');
        expect(headerRow.find(Col).at(2).text()).to.equal('Balance');
        expect(headerRow.find(Col).at(3).text()).to.equal('Delete');
      });
    });
  });
}
