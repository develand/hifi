import {Mongo} from 'meteor/mongo';

export const Accounts = new Mongo.Collection('accounts');
Accounts._ensureIndex({accountNumber: 1}, {unique: true});

