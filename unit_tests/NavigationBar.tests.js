import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import Navigationbar from '../imports/ui/Navigationbar.jsx';

if (Meteor.isClient) {
  describe('Navbar', () => {
    describe('Look & Feel', function() {
      let navbarElem = null;

      beforeEach(() => {
        navbarElem = mount(<Navigationbar  />);
      });

      it('displays the application logo', function() {
        expect(navbarElem.find('img')).to.have.length(1);
      });
    });
  });
}
