import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import {IntlProvider} from 'react-intl';
import App from './App.jsx'
import AccountOverview from '../components/AccountOverview.jsx'
import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';

if (Meteor.isClient) {
    describe('App Container', () => {
        describe('Look & Feel', () => {
            describe('Interaction with AccountsList', () => {
                const FIRST_ACCOUNT_NUMBER = 'AAAAA';
                const SECOND_ACCOUNT_NUMBER = 'BBBBB';

                beforeEach(() => {
                    Factory.create('account', {accountNumber: FIRST_ACCOUNT_NUMBER});
                    Factory.create('account', {accountNumber: SECOND_ACCOUNT_NUMBER});
 
                    appContainerElem =
                        mount(<IntlProvider locale="en"><App /></IntlProvider>);
                });

                it('the overview tab lists all selected accounts in order by account number', () => {
                    const accountOverviewTab = appContainerElem.find(AccountOverview);

                    const firstDataRow = accountOverviewTab.find(Row).at(1)
                    const firstRowCols = firstDataRow.find(Col);
                    expect(firstRowCols.at(0).find('div').at(0).props.children).to.contain(FIRST_ACCOUNT_NUMBER);

                    const secondDataRow = accountOverviewTab.find(Row).at(2)
                    const secondRowCols = secondDataRow.find(Col);
                    expect(secondRowCols.at(0).find('div').at(0).props.children).to.contain(SECOND_ACCOUNT_NUMBER);
                });
            });
        });
    });
}
