import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import {Tabs, Tab} from 'react-bootstrap';

import FinanceDetailContainer from './FinanceDetailContainer.jsx';
import {IntlProvider} from 'react-intl';

if (Meteor.isClient) {
  describe('Finance Detail Container', () => {
    describe('Look & Feel', () => {
      let tabs = null;

      beforeEach(() => {
        financeDetailContainerElem =
          mount(<IntlProvider locale="en"><FinanceDetailContainer /></IntlProvider>);
        tabs = financeDetailContainerElem.find(Tabs);
      });

      it('Contains a single tabbed control', () => {
        expect(tabs).to.have.length(1);
      });

      it('Contains an Overview subtab', () => {
        expect(tabs.find(Tab).at(0).node.props.title).to.equal('Overview');
        expect(tabs.find(Tab).at(0).text()).to.equal('Overview');
      });

      it('Contains a Trends subtab', () => {
        expect(tabs.find(Tab).at(1).node.props.title).to.equal('Trends');
        expect(tabs.find(Tab).at(1).text()).to.equal('Trends');
      });
    });
  });
}
