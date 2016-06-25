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
      it('displays an account row', function() {
        const account = Factory.build('account');
        const wrapper = shallow(<Account account={account} />);
        expect(wrapper.find(Row)).to.have.length(1);
      });
    });
  });
}
