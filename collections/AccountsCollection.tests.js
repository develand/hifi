import {Meteor} from 'meteor/meteor';
import {assert, expect} from 'meteor/practicalmeteor:chai';
import {AccountsCollection} from '/collections/AccountsCollection.js';

if (Meteor.isServer) {
  const ACCOUNT_NUMBER = 'XX1234';

  describe('AccountsCollection', function() {
    describe('Methods', function() {
      beforeEach(function() {
        AccountsCollection.remove({});
        AccountsCollection.insert({
          accountNumber: ACCOUNT_NUMBER,
          createdAt: new Date(),
          balance: 100,
        });
      });

      it('creates a single valid account', function() {
        assert.equal(AccountsCollection.find({}).count(), 1);
      });

      it('found account has the right account number', function() {
        const account = AccountsCollection.findOne({});
        assert.equal(account.accountNumber, ACCOUNT_NUMBER);
      });

      it('successfully deletes a single valid account', function() {
        AccountsCollection.remove({accountNumber: ACCOUNT_NUMBER});
        assert.equal(AccountsCollection.find({accountNumber: ACCOUNT_NUMBER}).count(), 0);
      });

      it('will reject the creation of a duplicate Account Number', function() {
        expect(function() {
          AccountsCollection.insert({
            accountNumber: 'XX1234',
            createdAt: new Date(),
            balance: 100,
          });
        }).to.throw('insertDocument :: caused by :: 11000 E11000 duplicate key error index: ' +
          'meteor.accounts.$accountNumber_1  dup key: { : "XX1234" }');
      });
    });
  });

  describe('Account Assets', function() {
    beforeEach(function() {
      AccountsCollection.remove({});
      AccountsCollection.insert({
        accountNumber: ACCOUNT_NUMBER,
        createdAt: new Date(),
        balance: 100,
        assets: [
          {
            symbol: 'IBM',
            numUnits: 1000,
            purchaseDate: '2015-01-01',
            unitPrice: 150.00,
          },
          {
            symbol: 'IBM',
            numUnits: 1000,
            purchaseDate: '2015-01-01',
            unitPrice: 150.00,
          },
          {
            symbol: 'APL',
            numUnits: 200,
            purchaseDate: '2015-06-01',
            unitPrice: 65.00,
          },
        ],

      });
    });

    it('are saved and retrieved', () => {
      const account = AccountsCollection.findOne({accountNumber: ACCOUNT_NUMBER});
      expect(account).to.not.be.null;
      assert.equal(account.accountNumber, ACCOUNT_NUMBER);
      assert.equal(account.assets.length, 3);
    });
  });
}
