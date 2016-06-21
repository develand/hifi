import {AccountsCollection} from '../imports/api/AccountsCollection.js';

Factory.define('account', AccountsCollection, {
  accountNumber: 'XX1234',
  balance: 100,
  createdAt: new Date(),
});
