import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import './style/user-table.css';
import User from './User';

interface Props
{
}

interface State
{
	showAddDialog: boolean
	showEditDialog: boolean
	users: any[]
	editKey: string
	editFirstName: string
	editLastName: string
	editEmail: string
}

export default class UserTable extends React.Component<Props, State>
{
	constructor(props: Props)
	{
		super(props);

		this.state = {
			showAddDialog: false,
			showEditDialog: false,
			users: [],
			editKey: '',
			editFirstName: '',
			editLastName: '',
			editEmail: ''
		};
	}

	loadAllUser = () =>
	{
		fetch('http://localhost:8080/users/')
			.then(res => res.json())
			.then((result) =>
			{
				let allUsers: any[] = [];
				result.forEach((user: any) =>
				{
					allUsers.push(User(user.key, user.firstName, user.lastName, user.email, this.handleEditShow, this.handleDelete));
				});
				this.setState({users: allUsers});
			}, (error) =>
			{
				console.error(error);
			});
	};

	updateUser = (key: any, firstName: string, lastName: string, email: string) =>
	{
		let userToUpdate = this.getUser(key);

		userToUpdate.then(userToUpdate =>
		{
			userToUpdate.firstName = firstName;
			userToUpdate.lastNameName = lastName;
			userToUpdate.email = email;

			let allUser = this.state.users;
			if (userToUpdate)
			{
				fetch('http://localhost:8080/users/' + key, {
					method: 'put',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						key: key,
						firstName: userToUpdate.firstName,
						lastName: userToUpdate.lastName,
						email: userToUpdate.email
					})
				})
					.then(res => res.json())
					.then((result) =>
					{
						let index = allUser.map(function(e)
						{
							return e.key;
						}).indexOf(key);
						allUser[index] = User(key, firstName, lastName, email, this.handleEditShow, this.handleDelete);
						this.setState({users: allUser});
					}, (error) =>
					{
						console.error(error);
					});

				this.handleClose();
			}

		});
	};

	getUser = async(key: string): Promise<any> =>
	{
		let user = undefined;
		await fetch('http://localhost:8080/users/' + key, {method: 'get'})
			.then(res => res.json())
			.then((result) =>
			{
				user = result;
			}, (error) =>
			{
				console.error(error);
			});
		return user;
	};

	addUser = (firstName: string, lastName: string, email: string) =>
	{
		fetch('http://localhost:8080/users/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email
			})
		}).then(res => res.json())
			.then((result) =>
			{
				let allUser = this.state.users;
				let newUser = User(result.key, firstName, lastName, email, this.handleEditShow, this.handleDelete);
				allUser.push(newUser);
				this.setState({users: allUser});
				this.handleClose();
			}, (error) =>
			{
				console.error(error);
			});
	};

	deleteUser = (key: any) =>
	{
		fetch('http://localhost:8080/users/' + key, {
			method: 'delete'
		})
			.then(() =>
			{
			}, (error) =>
			{
				console.error(error);
			});
	};

	componentDidMount(): void
	{
		this.loadAllUser();
	}

	handleClose = () =>
	{
		this.setState({showAddDialog: false});
		this.setState({showEditDialog: false});
	};

	handleAddShow = () =>
	{
		this.setState({showAddDialog: true});
	};

	handleEditShow = (key: string, firstName: string, lastName: string, email: string) =>
	{
		this.setState({
			editKey: key,
			editFirstName: firstName,
			editLastName: lastName,
			editEmail: email
		});
		this.setState({showEditDialog: true});
	};

	handleDelete = (key: string) =>
	{
		let allUser = this.state.users;
		allUser.forEach(user =>
		{
			if (user.key === key)
			{
				allUser.splice(allUser.indexOf(user), 1);
				this.deleteUser(key);
				return;
			}
		});
		this.setState({users: allUser});
	};

	handleAddUser = (firstName: string, lastName: string, email: string) =>
	{
		this.addUser(firstName, lastName, email);
	};

	handleEditUser = (key: string, firstName: string, lastName: string, email: string) =>
	{
		this.updateUser(key, firstName, lastName, email);
	};

	render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined
	{
		// @ts-ignore
		return <div className={'user-table'}>
			<Table striped bordered hover>
				<thead>
				<tr>
					<th>Fist name</th>
					<th>Last name</th>
					<th>E-Mail</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{this.state.users.map((item: any) => item.getHtml())}
				<tr>
					<td className={'add-button-row'} colSpan={4} style={{textAlign: 'center'}}>
						<Button className={'add-button'} variant="secondary" onClick={this.handleAddShow}>Add a new user</Button>
					</td>
				</tr>
				</tbody>
			</Table>

			<AddUserModal show={this.state.showAddDialog} onAdd={this.handleAddUser} onClose={this.handleClose}/>
			<EditUserModal show={this.state.showEditDialog} onEdit={this.handleEditUser} onClose={this.handleClose} userKey={this.state.editKey}
			               firstName={this.state.editFirstName} lastName={this.state.editLastName} email={this.state.editEmail}/>
		</div>;
	}

}