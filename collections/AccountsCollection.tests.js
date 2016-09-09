import {Meteor} from 'meteor/meteor';
import {assert, expect} from 'meteor/practicalmeteor:chai';
import {AccountsCollection} from '/collections/AccountsCollection.js';

const ACCOUNT_NUMBER = 'XX1234';

if (Meteor.isServer) {
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

      afterEach(function() {
        AccountsCollection.remove({accountNumber: ACCOUNT_NUMBER});
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
        }).to.throw('E11000 duplicate key error collection: meteor.accounts index: ' +
          'accountNumber_1 dup key: { : "XX1234" }');
      });
    });

    describe('Account Assets', function() {
      beforeEach(function() {
        addTestAssets();
      });

      afterEach(function() {
        AccountsCollection.remove({accountNumber: ACCOUNT_NUMBER});
      });

      it('are saved and retrieved', () => {
        const account = AccountsCollection.findOne({accountNumber: ACCOUNT_NUMBER});
        assert.notEqual(account, null);
        assert.equal(account.accountNumber, ACCOUNT_NUMBER);
        assert.equal(account.assets.length, 3);
      });

      it('can add new asset to an acount', () => {
        const account = AccountsCollection.findOne({accountNumber: ACCOUNT_NUMBER});
        account.assets.push(
          {
            symbol: 'MSFT',
          }
        );
      });
    });

    describe('Validation', () => {
      it('requires that an account number be provided', () => {
        expect(function() {
          AccountsCollection.insert({
            createdAt: new Date(),
            balance: 100,
          });
        }).to.throw('Account number is required');
      });

      it('requires that a balance be provided', () => {
        expect(function() {
          AccountsCollection.insert({
            accountNumber: ACCOUNT_NUMBER,
            createdAt: new Date(),
          });
        }).to.throw('Balance is required');
      });

      it('it properly saves a createdAt date if passed', () => {
        AccountsCollection.insert({
          accountNumber: ACCOUNT_NUMBER,
          createdAt: '2001-01-01',
          balance: 100,
        }, function() {
          const account = AccountsCollection.findOne({accountNumber: ACCOUNT_NUMBER});
          assert.equal(account.createdDate, '2001-01-01');
        });
      });

      it('it sets a default createdAt date if one is not passed', () => {
        AccountsCollection.insert({
          accountNumber: ACCOUNT_NUMBER,
          balance: 100,
        }, function() {
          const account = AccountsCollection.findOne({accountNumber: ACCOUNT_NUMBER});
          assert.notEqual(account.createdDate, null);
        });
      });

      it('prevents the entry of a negative asset unit price', () => {
        expect(function() {
          AccountsCollection.insert({
            accountNumber: ACCOUNT_NUMBER,
            createdAt: new Date(),
            balance: 100,
            assets: [
              {
                symbol: 'IBM',
                numUnits: 1000,
                purchaseDate: '2015-01-01',
                unitPrice: 0.00,
              },
            ],
          });
        }).to.throw('Unit price must be at least 0.01');
      });

      it('requires that an asset symbol be provided', () => {
        expect(function() {
          AccountsCollection.insert({
            accountNumber: ACCOUNT_NUMBER,
            balance: 100.0,
            assets: [
              {
                numUnits: 1.0,
                unitPrice: 100.0,
              },
            ],
          });
        }).to.throw('Symbol is required');
      });

      it('requires that asset numUnits be provided', () => {
        expect(function() {
          AccountsCollection.insert({
            accountNumber: ACCOUNT_NUMBER,
            balance: 100.0,
            assets: [
              {
                symbol: 'IBM',
                unitPrice: 100.0,
              },
            ],
          });
        }).to.throw('Number of Units is required');
      });

      it('requires that asset unit price be provided', () => {
        expect(function() {
          AccountsCollection.insert({
            accountNumber: ACCOUNT_NUMBER,
            balance: 100.0,
            assets: [
              {
                symbol: 'IBM',
                numUnits: 1.0,
                balance: 100.0,
              },
            ],
          });
        }).to.throw('Unit price is required');
      });

      it('it sets a default asset purchase date if one is not passed', () => {
        AccountsCollection.insert({
          accountNumber: ACCOUNT_NUMBER,
          balance: 100,
          assets: [
            {
              symbol: 'IBM',
              numUnits: 1.0,
              balance: 100.0,
              unitPrice: 100.0,
            },
          ],
        }, function() {
          const account = AccountsCollection.findOne({accountNumber: ACCOUNT_NUMBER});
          assert.notEqual(account.assets[0].createdDate, null);
        });
      });

      it('it persists an asset purchase date if one is passed', () => {
        AccountsCollection.insert({
          accountNumber: ACCOUNT_NUMBER,
          balance: 100,
          assets: [
            {
              symbol: 'IBM',
              numUnits: 1.0,
              balance: 100.0,
              unitPrice: 100.0,
              purchaseDate: '2001-01-01',
            },
          ],
        }, function() {
          const account = AccountsCollection.findOne({accountNumber: ACCOUNT_NUMBER});
          assert.equals(account.assets[0].createdDate, '2001-01-01');
        });
      });
    });


      //   symbol: {
      //   type: String,
      // },
      // numUnits: {
      //   type: Number,
      //   min: 0.01,
      // },
      // purchaseDate: {
      //   type: Date,
      //   defaultValue: new Date(),
      // },
      // unitPrice: {
      //   type: Number,
      //   min: 0.01,
      // },

    describe('Asset transactions', () => {
      let testAccount = null;

      beforeEach(function() {
        addTestAssets();
        testAccount = AccountsCollection.findOne({accountNumber: ACCOUNT_NUMBER});
      });
    });
  });
}

/**
 * Add sample account assets
**/
function addTestAssets() {
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
        symbol: 'CSCO',
        numUnits: 300,
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
}
