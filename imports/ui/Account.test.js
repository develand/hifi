import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import Account from './Account.jsx';
import {Col, Row} from 'react-bootstrap';
import '../../factories/account.js';
import {IntlProvider} from 'react-intl';

if (Meteor.isClient) {
  describe('Account', () => {
    describe('Look & Feel', function() {
      let accountElem = null;

      beforeEach(() => {
        const account = Factory.build('account');
        accountElem = mount(<IntlProvider locale="en"><Account account={account} /></IntlProvider>);
      });

      it('displays an account row', function() {
        expect(accountElem.find(Row)).to.have.length(1);
      });

      it('displays four columns', () => {
        const rowElem = accountElem.find(Row);
        expect(rowElem.find(Col)).to.have.length(4);
      });
    });
  });
}
