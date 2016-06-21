import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const AccountsCollection = new Mongo.Collection('accounts');

if (Meteor.isServer) {
  AccountsCollection._ensureIndex({accountNumber: 1}, {unique: true});
}
