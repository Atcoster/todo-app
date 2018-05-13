import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Footer } from './layouts';
import { TodoList } from './content';
import { todosFetchData } from '../js/actions/todos';

class App extends Component {

	componentWillMount() {
		this.props.fetchData( 'http://localhost:3001/api/todos/' );
	}

	render() {
		return (
			<Fragment>
				<Header />
				<TodoList />
				<Footer />
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
