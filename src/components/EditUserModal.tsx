import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './style/user-table.css';

interface Props
{
	userKey: string
	firstName: string
	lastName: string
	email: string
	show: boolean
	onEdit: (userKey: string, firstName: string, lastName: string, email: string) => void
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

export default class EditUserModal extends React.Component<Props, State>
{
	constructor(props: Props)
	{
		super(props);
		this.state = {
			firstName: props.firstName,
			lastName: props.lastName,
			email: props.email,
			isFirstNameValid: false,
			isLastNameValid: false,
			isEmailValid: false,
			errors: {},
			validated: false
		};
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void
	{
		if (prevProps !== this.props)
		{
			this.setState({
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				email: this.props.email
			});
		}
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

	handleEdit = () =>
	{
		if (this.validate())
		{
			let {firstName, lastName, email} = this.state;
			this.props.onEdit(this.props.userKey, firstName, lastName, email);
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
		return <div className={'edit-user-modal'}>
			<Modal show={this.props.show}>
				<Modal.Header>
					<Modal.Title>Edit user</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form noValidate validated={this.state.validated}>
						<Form.Group controlId="editFormFirstName">
							<Form.Label>Fist Name</Form.Label>
							<Form.Control type="text"
							              placeholder="Enter fist name"
							              value={this.state.firstName}
							              onChange={(event: any) => this.setState({firstName: event.currentTarget.value})}
							              isValid={this.state.isFirstNameValid}
							              required
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors.firstName}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="editFormLastName">
							<Form.Label>Last name</Form.Label>
							<Form.Control type="text"
							              placeholder="Enter last name"
							              value={this.state.lastName}
							              onChange={(event: any) => this.setState({lastName: event.currentTarget.value})}
							              isValid={this.state.isLastNameValid}
							              required
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors.lastName}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="editFormEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email"
							              placeholder="Enter email"
							              value={this.state.email}
							              onChange={(event: any) => this.setState({email: event.currentTarget.value})}
							              isValid={this.state.isEmailValid}
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
					<Button variant="primary" onClick={this.handleEdit}>Edit</Button>
				</Modal.Footer>
			</Modal>
		</div>;
	}

}