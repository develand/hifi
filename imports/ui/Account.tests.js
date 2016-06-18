import {Meteor} from 'meteor/meteor';
import {assert,expect} from 'meteor/practicalmeteor:chai';
import {Accounts} from '../api/Accounts.js';

if (Meteor.isClient) {
	describe('Account', () => {
		describe('Look & Feel', function() {
			beforeEach(() => {
				Accounts.remove({});
				accountId = Accounts.insert({
					accountNumber: 'XX1234',
					createdAt: new Date(),
					balance: 100
				});
			});

			it('displays an account list titles "Accounts"', function() {
				expect.equal(1,1);

			})

		});
	});
}