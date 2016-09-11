import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const AccountsCollection = new Mongo.Collection('accounts');

if (Meteor.isServer) {
  // Add unique index to prevent duplicate account numbes
  AccountsCollection._ensureIndex({accountNumber: 1}, {unique: true});

  // Publish all accounts
  Meteor.publish('accounts', function accountsPublication() {
    return AccountsCollection.find({});
  });

  // Define a schema for Assets within an Account
  const AssetSchema = new SimpleSchema({
    symbol: {
      type: String,
    },
    numUnits: {
      label: 'Number of Units',
      type: Number,
      min: 0.01,
    },
    purchaseDate: {
      type: Date,
      defaultValue: new Date(),
    },
    unitPrice: {
      type: Number,
      min: 0.01,
    },
  });

  // Define a schema for the AccountsCollection
  const AccountsSchema = new SimpleSchema({
    accountNumber: {
      type: String,
    },
    balance: {
      type: Number,
    },
    createdAt: {
      type: Date,
      defaultValue: new Date(),
    },
    assets: {
      type: [AssetSchema],
      optional: true,
    },
  });

  // Attach the schema to the accounts collection
  AccountsCollection.attachSchema(AccountsSchema);
}
