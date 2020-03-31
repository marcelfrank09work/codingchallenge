import React from 'react';
import './App.css';
import Header from "./components/Header";
import UserTable from "./components/UserTable";
import 'bootstrap/dist/css/bootstrap.min.css';

function App()
{
	return (
		<div style={{padding:"10px"}}>
			<Header/>
			<UserTable/>
		</div>
	);
}

export default App;
