import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';


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
        </Navbar>
    );
  }
}
