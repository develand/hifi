import {Meteor} from 'meteor/meteor';
import {assert, expect} from 'meteor/practicalmeteor:chai';
import {AccountsCollection} from '../imports/api/AccountsCollection.js';
import {Promise} from 'meteor/promise';

if (Meteor.isServer) {
  describe('Accounts', function() {
    describe('Methods', function() {
      beforeEach(function() {
        AccountsCollection.remove({});
        AccountsCollection.insert({
          accountNumber: 'XX1234',
          createdAt: new Date(),
          balance: 100,
        });
      });

      it('successfully creates a single valid account', function() {
        assert.equal(AccountsCollection.find({}).count(), 1);
      });

      it('successfully deletes a single valid account', function() {
        AccountsCollection.remove({accountNumber: 'XX1234'});
        assert.equal(AccountsCollection.find({accountNumber: 'XX1234'}).count(), 0);
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
      let account = null;

      beforeEach(function() {
        console.log('before each');
        AccountsCollection.remove({});
        AccountsCollection.insert({
          accountNumber: 'XX1234',
          createdAt: new Date(),
          balance: 100,
          assets: [
            {
              symbol : "IBM",
              numUnits: 1000,
              purchaseDate: "2015-01-01",
              unitPrice: 150.00,
            },
            {
              symbol : "IBM",
              numUnits: 1000,
              purchaseDate: "2015-01-01",
              unitPrice: 150.00,
            },
            {
              symbol : "APL",
              numUnits: 200,
              purchaseDate: "2015-06-01",
              unitPrice: 65.00,
            },
          ],

        });

        let account = AccountsCollection.findOne({acccountNumber: 'XX1234'});
        console.log('Account: ' + account);
      });

      it('are saved and retrieved', () => {
        expect(account).to.not.be.null;
        assert.equal(account.accountNumber, 'XX1234');
        assert.equal(account.assets.length, 3);
      });
  });
}
