import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from './layouts';
import { TodoList } from './content';
import { todosFetchData } from '../js/actions/index.js';

class App extends Component {

	componentWillMount() {
		this.props.fetchData( '/todos' );
	}

	render() {
		return (
			<Fragment>
				<Header />
				<TodoList />
			</Fragment>
		);
	}
}

App.propTypes = {
	fetchData : PropTypes.func.isRequired
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		fetchData : ( url ) => dispatch( todosFetchData( url ))
	};
};

export default connect( null, mapDispatchToProps )( App );
