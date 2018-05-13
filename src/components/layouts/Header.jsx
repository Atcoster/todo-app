import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from 'material-ui';

class Header extends Component {

	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<IconButton color="primary" aria-label="Menu">
					</IconButton>
					<Typography variant="title" color="inherit">
						Tasks
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		);
	}
}

export default Header;
