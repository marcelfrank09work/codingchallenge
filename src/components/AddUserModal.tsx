import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './style/user-table.css';

interface Props
{
	show: boolean
	onAdd: (firstName: string, lastName: string, email: string) => void
	onClose: () => void
}

interface State
{
	firstName: string
	lastName: string
	email: string
	isFirstNameValid: boolean
	isLastNameValid: boolean
	isEmailValid: boolean
	errors: any
	validated: boolean
}

export default class AddUserModal extends React.Component<Props, State>
{
	constructor(props: Props)
	{
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			isFirstNameValid: false,
			isLastNameValid: false,
			isEmailValid: false,
			errors: {},
			validated: false
		};
	}

	validate = (): boolean =>
	{
		let errors: any = {};
		this.setState({
			isFirstNameValid: true,
			isLastNameValid: true,
			isEmailValid: true,
			validated: true
		});
		if (this.state.firstName.length < 1)
		{
			this.setState({isFirstNameValid: false});
			errors.firstName = 'First name cannot be empty.';
		}

		if (this.state.lastName.length < 1)
		{
			this.setState({isLastNameValid: false});
			errors.lastName = 'Last name cannot be empty.';
		}

		if (this.state.email.length < 1)
		{
			this.setState({isEmailValid: false});
			errors.email = 'Email cannot be empty.';
		}
		else if (!this.state.email.includes('@') || !this.state.email.includes('.'))
		{
			this.setState({isEmailValid: false});
			errors.email = 'This is not a valid email.';
		}

		this.setState({errors: errors});
		return Object.keys(errors).length < 1;
	};

	handleAdd = () =>
	{
		if (this.validate())
		{
			let {firstName, lastName, email} = this.state;
			this.props.onAdd(firstName, lastName, email);
			this.setState({
				firstName: '',
				lastName: '',
				email: '',
				isFirstNameValid: false,
				isLastNameValid: false,
				isEmailValid: false,
				errors: {},
				validated: false
			});
		}
	};

	render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined
	{
		return <div className={'add-user-modal'}>
			<Modal show={this.props.show}>
				<Modal.Header>
					<Modal.Title>Add new user</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form noValidate validated={this.state.validated}>
						<Form.Group controlId="formFirstName">
							<Form.Label>Fist Name</Form.Label>
							<Form.Control type="text"
							              placeholder="Enter fist name"
							              isValid={this.state.isFirstNameValid}
							              onChange={(event: any) => this.setState({firstName: event.currentTarget.value})}
							              required
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors.firstName}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formLastName">
							<Form.Label>Last name</Form.Label>
							<Form.Control type="text"
							              placeholder="Enter last name"
							              isValid={this.state.isLastNameValid}
							              onChange={(event: any) => this.setState({lastName: event.currentTarget.value})}
							              required
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors.lastName}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email"
							              placeholder="Enter email"
							              isValid={this.state.isEmailValid}
							              onChange={(event: any) => this.setState({email: event.currentTarget.value})}
							              required
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors.email}
							</Form.Control.Feedback>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={this.props.onClose}>Close</Button>
					<Button variant="primary" onClick={this.handleAdd}>Add</Button>
				</Modal.Footer>
			</Modal>
		</div>;
	}

}