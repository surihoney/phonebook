import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const Error = () => {
	return (
		<div>
			<p>Error: Page does not exist!</p>
		</div>
	);
}

export const ErrorModal = ({ isOpen, onClose, message }) => {
	return (
		<Modal isOpen={isOpen} toggle={onClose}>
			<ModalHeader>Error</ModalHeader>
			<ModalBody>
				<p>{message}</p>
			</ModalBody>
		</Modal>
	);
}

export default Error;