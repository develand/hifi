import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import {mount} from 'enzyme';
import Account from '/imports/ui/components/Account.jsx';
import {Col, Row} from 'react-bootstrap';
import '/factories/account.js';
import {IntlProvider} from 'react-intl';

if (Meteor.isClient) {
  describe('Account', () => {
    let account = null;
    let accountElem = null;
    let onDeleteAccount = sinon.spy();
    let onSelectAccount = sinon.spy();

    beforeEach(() => {
      account = Factory.build('account');
      accountElem = mount(
        <IntlProvider locale="en">
          <Account account={account}
            onDeleteAccount={onDeleteAccount}
            onSelectAccount={onSelectAccount} />
        </IntlProvider>
      );
    });

    describe('Look & Feel', function() {
      it('displays an account row', function() {
        expect(accountElem.find(Row)).to.have.length(1);
      });

      it('displays four columns', () => {
        const rowElem = accountElem.find(Row);
        expect(rowElem.find(Col)).to.have.length(4);
      });
    });

    describe('Account Actions', () => {
      it('passes the account primary key to onDeleteAccount', () => {
        const buttonElem = accountElem.find('button').first();
        buttonElem.simulate('click');
        expect(onDeleteAccount.alwaysCalledWith(account._id)).to.equal(true);
      });

      it('calls onSelectAccount when the select checkbox is clicked', () => {
        const checkboxElem = accountElem.find('input[type="checkbox"]').first();
        checkboxElem.simulate('click');
        expect(onSelectAccount.calledOnce).to.equal(true);      
      });
    });
  });
}