import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect,assert} from 'meteor/practicalmeteor:chai';
import {shallow, mount} from 'enzyme';
import Account from './Account.jsx';
import Accounts from './Accounts.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import '../../factories/account.js';

if (Meteor.isClient) {
  describe('Account List', () => {
    describe('Look & Feel', function() {
      let accountsElem = null;

      beforeEach(() => {
        const accounts = Factory('accounts')
        accountsElem = mount(<Accounts />);
      })

      if('contains an accountList class', () => {
        expect(accountsElem.find('accountsList').length);
      });

      it('displays an account list H1 header labeled "Accounts"', function() {
        expect(accountsElem.find('h1').at(0).text()).to.equal('Accounts');
      });

      it('displays an accounts row header with the proper labels', function() {
        const grid = accountsElem.find(Grid);
        const headerRow = grid.find(Row).first();
        const firstColumn = headerRow.find(Col).first();
        expect(headerRow.find(Col).at(0).text()).to.equal("Del");
        expect(headerRow.find(Col).at(1).text()).to.equal("Fil");
        expect(headerRow.find(Col).at(2).text()).to.equal("Account #");
        expect(headerRow.find(Col).at(3).text()).to.equal("Balance");
      });
    });
  });
}
