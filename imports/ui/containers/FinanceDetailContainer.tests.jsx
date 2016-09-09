import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import {Tabs, Tab} from 'react-bootstrap';
import FinanceDetailContainer from './FinanceDetailContainer.jsx';
import {IntlProvider} from 'react-intl';

if (Meteor.isClient) {
  const ACCOUNT_NUMBER_1 = 'AAAAAA';
  const ACCOUNT_NUMBER_2 = 'BBBBBB';

  describe('Finance Detail Container', () => {
    describe('Look & Feel', () => {
      let tabs = null;

      beforeEach(() => {
        const accounts = [
          {
            _id: 1,
            accountNumber: ACCOUNT_NUMBER_1,
            balance: 100,
            createdAt: new Date(),
          },
          {
            _id: 2,
            accountNumber: ACCOUNT_NUMBER_2,
            balance: 200,
            createdAt: new Date(),
          },
        ];

        financeDetailContainerElem =
          mount(
            <IntlProvider locale="en">
              <FinanceDetailContainer accounts={accounts}/>
            </IntlProvider>
          );
        tabs = financeDetailContainerElem.find(Tabs);
      });

      it('Contains a single tabbed control', () => {
        expect(tabs).to.have.length(1);
      });

      it('Contains an Overview subtab', () => {
        expect(tabs.find(Tab).at(0).node.props.title).to.equal('Overview');
      });

      it('Contains a Trends subtab', () => {
        expect(tabs.find(Tab).at(1).node.props.title).to.equal('Trends');
        expect(tabs.find(Tab).at(1).text()).to.equal('Trends');
      });

      it('Contains a Positions subtab', () => {
        expect(tabs.find(Tab).at(2).node.props.title).to.equal('Positions');
      });
    });
  });
}
