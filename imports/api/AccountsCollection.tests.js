import {Meteor} from 'meteor/meteor';
import {assert, expect} from 'meteor/practicalmeteor:chai';
import {AccountsCollection} from './AccountsCollection.js';

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

      it('sill reject the creation of a duplicate Account Number', function() {
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
}
