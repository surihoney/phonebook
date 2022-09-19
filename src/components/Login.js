import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			output: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {

		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit(event) {
		console.log(this.state.username)
		console.log(this.state.email)
		console.log(this.state.password)
		event.preventDefault();
	}

	render() {

		return (
			<Form onSubmit={this.handleSubmit}>
				<FormGroup row>
					<Label for="username" sm={2}>Username</Label>
					<Col sm={4}>
						<Input type="text" name="username" id="username" placeholder="with a placeholder" value={this.state.username} onChange={this.handleChange} />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="email" sm={2}>Email</Label>
					<Col sm={4}>
						<Input type="email" name="email" id="email" placeholder="with a placeholder" value={this.state.email} onChange={this.handleChange} />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="password" sm={2}>Password</Label>
					<Col sm={4}>
						<Input type="password" name="password" id="password" placeholder="password placeholder" value={this.state.password} onChange={this.handleChange} />
					</Col>
				</FormGroup>
				<FormGroup row>

					<Col sm={4}>
						<input type="submit" value="Submit" />
					</Col>
				</FormGroup>
			</Form>
		);
	}
}