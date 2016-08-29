import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import {mount} from 'enzyme';
import AccountsList from '/imports/ui/components/AccountsList.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import {IntlProvider} from 'react-intl';
import '/factories/account.js';

if (Meteor.isClient) {
  describe('Account List', () => {
    describe('Look & Feel', function() {
      let accountsListElem = null;
      let grid = null;
      let accounts = null;
      let onDeleteAccount = sinon.spy();
      let onSelectAccount = sinon.spy();

      beforeEach(() => {
        accounts = [
          {
            _id: 1,
            accountNumber: 'XX123',
            balance: 100,
            createdAt: new Date(),
          },
          {
            _id: 2,
            accountNumber: 'XX456',
            balance: 200,
            createdAt: new Date(),
          },
          {
            _id: 3,
            accountNumber: 'XX789',
            balance: 300,
            createdAt: new Date(),
          },
        ];
        accountsListElem = mount(
          <IntlProvider locale="en">
            <AccountsList accounts={accounts}
              onDeleteAccount={onDeleteAccount} onSelectAccount={onSelectAccount} />
          </IntlProvider>
        );

        grid = accountsListElem.find(Grid);
      });

      describe('Account List Grid', () => {
        it('contains an accountList class', () => {
          expect(accountsListElem.find(AccountsList).length);
        });

        it('displays an accounts row header with the proper labels', function() {
          const headerRow = grid.find(Row).first();
          expect(headerRow.find(Col).at(0).text()).to.equal('');
          expect(headerRow.find(Col).at(1).text()).to.equal('Account');
          expect(headerRow.find(Col).at(2).text()).to.equal('Balance');
          expect(headerRow.find(Col).at(3).text()).to.equal('');
        });

        it('expects rows for header and account data', function() {
          expect(grid.find(Row)).to.have.length(1 + accounts.length);
        });

        it('expects accounts to be ordered in the order they are placed in the accounts array',
          function() {
            expect(grid.find(Row).at(1).find(Col).at(1).text()).to.equal('XX123');
            expect(grid.find(Row).at(2).find(Col).at(1).text()).to.equal('XX456');
            expect(grid.find(Row).at(3).find(Col).at(1).text()).to.equal('XX789');
          });

        it('calls onSelectAccount when an account is selected', function() {
          checkElem = grid.find(Row).at(0);
          checkElem.simulate('click', () => {
            expect(onSelectAccount.calledOnce).to.equal(true);
          });
        });
      });
    });
  });
}
