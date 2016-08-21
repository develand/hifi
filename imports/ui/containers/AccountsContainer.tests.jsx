import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import {Grid, Row} from 'react-bootstrap';
import AccountsContainer from './AccountsContainer.jsx';
import Account from '../components/Account.jsx';
import AccountsQuickEntry from '../components/AccountsQuickEntry.jsx';
import {IntlProvider} from 'react-intl';
import {AccountsCollection} from '/collections/AccountsCollection.js';
import TestUtils from 'react-addons-test-utils';
import '/factories/account.js';

if (Meteor.isClient) {
  
  describe('Accounts Container', () => {
    const ACCOUNT_NUMBER = 'XX1234';
    const NEW_ACCOUNT_NUMBER = 'NewAccount';
    let accounts = null;
    let accountsContainerElem = null;

    beforeEach(() => {
      const accounts = [
        {
          _id: 1,
          accountNumber: ACCOUNT_NUMBER,
          balance: 100,
          createdAt: new Date(),
        },
      ];
      accountsContainerElem =
        mount(<IntlProvider locale="en"><AccountsContainer accounts={accounts}/></IntlProvider>);
    });

    afterEach(function() {
      let testAccount = AccountsCollection.find({accountNumber: ACCOUNT_NUMBER});
      AccountsCollection.remove({_id: testAccount._id});

      testAccount = AccountsCollection.find({accountNumber: NEW_ACCOUNT_NUMBER});
      AccountsCollection.remove({_id: testAccount._id});
    });

    describe('Look & Feel', function() {
      it('displays an account list H1 header labeled "Accounts"', function() {
        expect(accountsContainerElem.find('h1').at(0).text()).to.equal('Accounts');
      });
    });

    describe('Methods', () => {
      it('adds a new account to the list when one is submitted', () => {

        const accountsQuickEntryElem = accountsContainerElem.find(AccountsQuickEntry);
        const formElem = accountsQuickEntryElem.find('form');
  
        expect(formElem).to.not.be.null;

        const inputElem = formElem.find('input');
        inputElem.get(0).value = NEW_ACCOUNT_NUMBER;

        formElem.simulate('submit', function() {
          const accountsListElem = accountsContainerElem.find('AccountsList').first();   
          expect(accountsListElem.find(Account)).to.have.length(2);       
        });
      });

      it('changes an accounts "selected" attribute to true when its checkbox is checked', () => {
          const accountsListElem = accountsContainerElem.find('AccountsList').first();   
          const grid = accountsListElem.find(Grid);
          checkElem = grid.find(Row).at(0)
          checkElem.simulate('click', () => {
            const account = AccountsCollection.find({accountNumber: ACCOUNT_NUMBER});
            expect(account.selected).to.equal(true);
          });
      });

      it('changes an accounts "selected" attribute back to false when clicked twice', () => {
          const accountsListElem = accountsContainerElem.find('AccountsList').first();   
          const grid = accountsListElem.find(Grid);
          checkElem = grid.find(Row).at(0)
          checkElem.simulate('click', () => {
            checkElem.simulate('click', () => {
              const account = AccountsCollection.find({accountNumber: ACCOUNT_NUMBER});
              expect(account.selected).to.equal(false);
            });
          });
      });
    });
  });
}
