import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import {mount} from 'enzyme';
import AccountsQuickEntry from '/imports/ui/components/AccountsQuickEntry.jsx';
import {IntlProvider} from 'react-intl';

if (Meteor.isClient) {
  describe('AccountQuickEntry', () => {
    describe('Look & Feel', function() {
      let accountsQuickEntryElem = null;
      let onAddAccount = null;

      beforeEach(() => {
        onAddAccount = sinon.spy();
        accountsQuickEntryElem =  mount(
          <IntlProvider locale="en">
              <AccountsQuickEntry onAddAccount={onAddAccount} />
          </IntlProvider>
        );
      });

      it('contains an accounts quick entry element', () => {
        expect(accountsQuickEntryElem).to.not.be.null;
      });

      it('should call method to add account when submited', () => {
        accountsQuickEntryElem.find('form').simulate('submit');
        expect(onAddAccount.calledOnce).to.equal(true);
      });

      it('should capture the account number and pass it to the parent', () => {
        accountsQuickEntryElem.find('input').get(0).value = '123.45';
        accountsQuickEntryElem.find('form').simulate('submit');
        expect(onAddAccount.alwaysCalledWith('123.45')).to.equal(true);
      });

      it('should trim the account number before passing it on', () => {
        accountsQuickEntryElem.find('input').get(0).value = '  123.45  ';
        accountsQuickEntryElem.find('form').simulate('submit');
        expect(onAddAccount.alwaysCalledWith('123.45')).to.equal(true);
      });
    });
  });
}
