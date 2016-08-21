import {AccountsCollection} from '/collections/AccountsCollection.js';

Factory.define('account', AccountsCollection, {
  accountNumber: 'XX1234',
  balance: 100,
  selected: false,
  createdAt: new Date(),
});
