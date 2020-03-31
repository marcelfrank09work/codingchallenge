import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function User(key: string,
                             firstName: string,
                             lastName: string,
                             email: string,
                             handleEdit: (key: string, firstName: string, lastName: string, email: string) => void,
                             handleRemove: (key: string) => void): any
{
	return {
		firstName: firstName,
		lastName: lastName,
		email: email,
		key: key,
		getHtml: function()
		{
			return (<tr key={this.key}>
				<td>{firstName}</td>
				<td>{lastName}</td>
				<td>{email}</td>
				<td>
					<InputGroup>
						<InputGroup.Prepend>
							<Button variant={'info'} onClick={() => handleEdit(key, firstName, lastName, email)}>Edit</Button>
						</InputGroup.Prepend>
						<InputGroup.Append>
							<Button variant={'danger'} onClick={() => handleRemove(key)}>Remove</Button>
						</InputGroup.Append>
					</InputGroup>
				</td>
			</tr>);
		}
	};
}