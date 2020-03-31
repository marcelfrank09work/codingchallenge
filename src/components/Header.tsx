import React from 'react';

interface Props
{
}

interface State
{
}

export default class Header extends React.Component<Props, State>
{
	constructor(props: Props)
	{
		super(props);
	}

	render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined
	{
		return <div className={'header'}>
			<h1>IntraFind Coding Challenge</h1>
		</div>;
	}

}