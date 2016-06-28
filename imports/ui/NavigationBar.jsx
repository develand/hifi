import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


// Task component - represents a single todo item
export default class NavigationBar extends Component {

  render() {
    return (
        <Navbar>
        	<Navbar.Header>
        		<Navbar.Brand>
					<a href="#">High Finance</a>
        		</Navbar.Brand>
        	</Navbar.Header>
            <Navbar.Collapse>
              <Nav bsStyle="pills" className="load-test-data" onSelect={this.handleSelect.bind(this)}>
                <NavItem eventKey={1} href="#">Future Look</NavItem>   
                <NavItem eventKey={2} href="#">Past Performance</NavItem>   
                <NavItem eventKey={3} href="#">Portfolio Breakdown</NavItem>   
                <NavItem eventKey={4} href="#">Load Test Data</NavItem>   
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }

  handleSelect(selectedKey) {
    alert("Selected: " + selectedKey);
  }
}
