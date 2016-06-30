import React from 'react';
import {Meteor} from 'meteor/meteor';
import {expect} from 'meteor/practicalmeteor:chai';
import {mount} from 'enzyme';
import Navigationbar from '../imports/ui/NavigationBar.jsx';
import {NavItem} from 'react-bootstrap';

if (Meteor.isClient) {
  describe('Navbar', () => {
    describe('Look & Feel', function() {
      let navbarElem = null;

      beforeEach(() => {
        navbarElem = mount(<Navigationbar  />);
      });

      it('displays the application logo', function() {
        expect(navbarElem.find('a.navbar-brand')).to.have.length(1);
        expect(navbarElem.find('a.navbar-brand').text()).to.equal('High Finance');
      });

      it('has a "Overview" button', () => {
        expect(navbarElem.find(NavItem).at(0).text()).to.equal('Overview');
      });

      it('has a "Future Look" button', () => {
        expect(navbarElem.find(NavItem).at(1).text()).to.equal('Future Look');
      });

      it('has a "Past Performance" button', () => {
        expect(navbarElem.find(NavItem).at(2).text()).to.equal('Past Performance');
      });

      it('has a "Portfolio Breakdown" button', () => {
        expect(navbarElem.find(NavItem).at(3).text()).to.equal('Portfolio Breakdown');
      });

      it('has a "Load Test Data" button', () => {
        expect(navbarElem.find(NavItem).at(4).text()).to.equal('Load Test Data');
      });
    });
  });
}
