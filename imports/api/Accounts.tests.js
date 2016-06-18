import {Meteor} from 'meteor/meteor';
import {assert,expect} from 'meteor/practicalmeteor:chai';
import {Accounts} from './Accounts.js';

if (Meteor.isServer) {
	describe('Accounts', function() {
		describe('Methods', function() {
			beforeEach(function() {
				Accounts.remove({});
				accountId = Accounts.insert({
					accountNumber: 'XX1234',
					createdAt: new Date(),
					balance: 100
				});
			});

			it('Successfully creates a single valid account', function() {
				assert.equal(Accounts.find({}).count(), 1);
			});

			it('Successfully deletes a single valid account', function() {
				Accounts.remove({accountNumber: 'XX1234'});
				assert.equal(Accounts.find({accountNumber: 'XX1234'}).count(), 0);
			});

			it('Will reject the creation of a duplicate Account Number', function() {
				expect(function() {
					Accounts.insert({
						accountNumber: 'XX1234',
						createdAt: new Date(),
						balance: 100
					});
				}).to.throw('insertDocument :: caused by :: 11000 E11000 duplicate key error index: meteor.accounts.$accountNumber_1  dup key: { : "XX1234" }');
			});
		});
	});
}