import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import AccountsQuickEntry from '/client/components/AccountsQuickEntry.jsx';
import AccountsList from '/client/components/AccountsList.jsx';
import {IntlProvider} from 'react-intl';

if (Meteor.isClient) {
  describe('AccountQuickEntry', () => {
    describe('Look & Feel', function() {
      let accountsQuickEntryElem = null;
      let accounts = null;

      beforeEach(() => {
        accounts = [
        ];
        const accountsListElem = mount(
          <IntlProvider locale="en">
          <AccountsList accounts={accounts}/>
          </IntlProvider>
        );

        accountsQuickEntryElem = accountsListElem.find(AccountsQuickEntry).at(0);
      });

      it('contains an accounts quick entry element', () => {
        expect(accountsQuickEntryElem).to.not.be.null;
      });
    });
  });
}
