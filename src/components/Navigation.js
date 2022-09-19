import React from 'react';
import { Nav, NavLink } from 'reactstrap';

const Navigation = () => {
	return (
		<Nav>
			<NavLink href="/">Home</NavLink>
			<NavLink href="/addContact">Add New Contact</NavLink>
		</Nav>
	);
}

export default Navigation;