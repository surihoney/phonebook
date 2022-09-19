import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Error from './components/Error';
import Navigation from './components/Navigation';
import ContactForm from "./components/Contact";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div style={{margin: '20px'}}>
					<h1>Phonebook</h1>
					<Navigation />
					<Routes>
						<Route path="/" element={<Home />} exact />
						<Route path="/addContact" element={<ContactForm />} exact />
						<Route path="/editContact/:id" element={<ContactForm />} exact />
						<Route element={<Error />} />
					</Routes>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
