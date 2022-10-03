import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ErrorModal from './ErrorModal';

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

export class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			name: '',
			phone: '',
			email: '',
			edit: false,
			invalidNo: false,
			invalidName: false,
			invalidNameMsg: "",
			popupError: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.closeError = this.closeError.bind(this);
	}

	componentDidMount() {
		let { id } = this.props.params;
		if(id > 0) {
			fetch('http://localhost:5000/getcontact/'+id).then(res => res.json()).then(data => {
				this.setState({
					id: data.id,
					name: data.name,
					phone: data.phone,
					email: data.email,
					edit: true
				});
			});
		}
	}

	checkUpperCase(str) {
		return str === str.toUpperCase() && str !== str.toLowerCase();
	}

	closeError() {
		this.setState({ popupError: false })
	}

	handleChange(e) {
		const re = /^[0-9\b]+$/;
		if(e.target.name === "phone") {	
			if (e.target.value === '' || re.test(e.target.value)) {
				this.setState({invalidNo: false})
			} else {
				this.setState({invalidNo: true, invalidNameMsg: "Invalid phone number"})
			}
		} else if(e.target.name === "name") {
			if (e.target.value.length < 7) {
				this.setState({invalidName: true, invalidNameMsg: "Name should be longer than 7 character"})
			} else if(!this.checkUpperCase(e.target.value)) {
				this.setState({invalidName: true, invalidNameMsg: "Name must be in uppercase letter" })
			}else {
				this.setState({invalidName: false})
			}
		}
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit(e) {
		e.preventDefault();
		if(this.state.invalidNo) {
			this.setState({popupError: true})
			return;
		}
		if(this.state.invalidName) {
			this.setState({popupError: true})
			return;
		}
		const data = {
			id: this.state.id,
			name: this.state.name,
			phone: this.state.phone,
			email: this.state.email
		}
		return fetch('http://localhost:5000/savecontact', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.status >= 200 && response.status < 300) {
				console.log(response);
				window.open("/", "_self");
			} else {
				console.log('Something happened wrong');
			}
		}).catch(err => err);
	}
	render() {
		return (
			<Form style={{ margin: '20px' }} onSubmit={this.handleSubmit}>
				<FormGroup row>
					<Label for="name" sm={2}>Name</Label>
					<Col sm={4}>
						<Input type="text" name="name" id="name" placeholder="Enter name" value={this.state.name}
						invalid={this.state.invalidName}
						onChange={this.handleChange} />
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="phone" sm={2}>Phone</Label>
					<Col sm={4}>
						<Input type="phone" name="phone" id="phone"
							placeholder="Enter contact number"
							value={this.state.phone}
							invalid={this.state.invalidNo}
							onChange={this.handleChange}
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="email" sm={2}>Email</Label>
					<Col sm={4}>
						<Input type="email" name="email" id="email"
							placeholder="Enter email address"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Col sm={4}>
						<Button type="submit" color="primary" onClick={e => this.handleSubmit(e)}>
							{this.state.edit ? "Save" : "Add"}
						</Button>
					</Col>
				</FormGroup>
				<ErrorModal open={this.state.popupError} message={this.state.invalidNameMsg} onClose={this.closeError}  />
			</Form>
		);
	}
}

export default withParams(ContactForm);