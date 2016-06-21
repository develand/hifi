import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {shallow} from 'enzyme';
import Account from './Account.jsx';
import {Row} from 'react-bootstrap';
import '../../factories/account.js';

if (Meteor.isClient) {
  describe('Account', () => {
    describe('Look & Feel', function() {
      it('uses an accountList class name', function() {
        const wrapper = shallow(<div />);
        expect(wrapper.hasClass('accountListx'));
      });

      it('displays an account list header "Accounts"', function() {
        const wrapper = shallow(<div />);
        const h1 = wrapper.find('h1');
        expect(h1.first().text()).to.equal('Accounts');
      });

      it('displays an account row', function() {
        const account = Factory.build('account', {
          accountNumber: 'XX1234',
          balance: 100,
          createdAt: new Date(),
        });

        const wrapper = shallow(<Account account={account} />);
        expect(wrapper.find(Row)).to.have.length(1);
      });
    });
  });
}
