import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import AccountsContainer from './AccountsContainer.jsx';
import {IntlProvider} from 'react-intl';
import '/factories/account.js';

if (Meteor.isClient) {
  describe('Account Container', () => {
    describe('Look & Feel', function() {
      let accountsContainerElem = null;

      beforeEach(() => {
        Factory.create('account');
        accountsContainerElem =
          mount(<IntlProvider locale="en"><AccountsContainer /></IntlProvider>);
      });

      it('displays an account list H1 header labeled "Accounts"', function() {
        expect(accountsContainerElem.find('h1').at(0).text()).to.equal('Accounts');
      });
    });
  });
}
