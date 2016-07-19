import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import FinanceDetailContainer from './FinanceDetailContainer.jsx';
import {IntlProvider} from 'react-intl';

if (Meteor.isClient) {
  describe('Finance Detail Container', () => {
    describe('Look & Feel', function() {

      beforeEach(() => {
        financeDetailContainerElem =
          mount(<IntlProvider locale="en"><FinanceDetailContainer /></IntlProvider>);
      });

      it('Contains a tabbed control', function() {
      });
    });
  });
}
