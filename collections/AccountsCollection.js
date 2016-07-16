import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const AccountsCollection = new Mongo.Collection('accounts');

if (Meteor.isServer) {
  // Add unique index to prevent duplicate account numbes
  AccountsCollection._ensureIndex({accountNumber: 1}, {unique: true});

  // Publish all accounts
  Meteor.publish('accounts', function accountsPublication() {
    return AccountsCollection.find({});
  });
}
