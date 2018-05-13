import React, { Component } from 'react';
import { AppBar, Tabs } from 'material-ui';
import { Tab } from 'material-ui/Tabs';
import HelpIcon  from '@material-ui/icons/Help';

class Footer extends Component {

	constructor ( props ) {
		super( props );

		this.state = {
			tabs  : [ 'To-do\'s', 'Item Two', 'Item Three' ],
			value : 0
		}
	}

	handleChange( event, value ) {
		this.setState( { value } );
	}

	render() {
		const { tabs } = this.state;

		return (
			<AppBar position="static" color="default">
				<Tabs className="footer"
					value={this.state.value}
					onChange={ this.handleChange.bind( this ) }
					scrollable
					scrollButtons="on"
					indicatorColor="primary"
					textColor="primary"
				>
					{
						tabs.map(( tab, index ) => <Tab key={ index } label={ tab } icon={ < HelpIcon />} /> )
					}
				</Tabs>
		  </AppBar>
		);
	}
}

export default Footer;
