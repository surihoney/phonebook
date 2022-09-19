import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table } from 'reactstrap';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}

	componentDidMount() {
		fetch('http://localhost:5000/').then(res => res.json()).then(data => {
			this.setState({
				list: data
			});
		});
	}

	render() {
		return (
			<div>
				<ContacTable list={this.state.list} />
			</div>
		);
	}
}

function ContacTable(props) {

	function handleDelete(e, id, name) {
		e.preventDefault();
		let text = "Are you confirm to delete a contact name "+name+" ?";
		if (window.confirm(text) === true) {
			return fetch('http://localhost:5000/delete/' + id, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.status >= 200 && response.status < 300) {
				console.log(response);
				window.open("/", "_self");
			} else {
				console.log('Something wrong happened');
			}
		}).catch(err => err);
		} else {
			console.log("Cancel delete");
		}
	}
	return (
		<Table hover responsive striped>
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Contact  Number</th>
					<th>Email  Address</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{props.list && props.list.length > 0 ? props.list.map((data, index) => {
					return (<tr key={"phone-contact" + index}>
						<th scope="row">{index + 1}</th>
						<td>{data.name}</td>
						<td>{data.phone}</td>
						<td>{data.email}</td>
						<td>
							<div style={{ display: 'inline-flex' }}>
								<div style={{ cursor: 'pointer', margin: '5px' }}>
									<Link to={"editContact/"+data.id}><i className="fa-solid fa-pen-to-square"></i></Link>
								</div>
								<div style={{ cursor: 'pointer', margin: '5px' }} onClick={e => handleDelete(e, data.id, data.name)}>
									<i className="fa-solid fa-trash" style={{color: '#0d6efd'}}></i>
								</div>
							</div>
						</td>
					</tr>)
				}) : <tr><td colSpan={5}>No information</td></tr>}
			</tbody>
		</Table>
	)
}
