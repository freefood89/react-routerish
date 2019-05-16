import React from 'react';
import logo from './logo.svg';
import './App.css';

const {Provider, Consumer} = React.createContext()

function View(path) {
	return function Wrapper(Component) {
		return function(props) {
			return (
				<Consumer>
					{({location, params}) => {
						if (location === path) {
							return <Component params={params} {...props} />
						} else {
							return null
						}
					}}
				</Consumer>
			)
		}

	}
}

const routes = {
	AA: 'AA',
	BB: 'BB'
}

const AAView = View(routes.AA)(
	function (props) {
		return (
			<p {...props}>
				Lolololcats for dayz
			</p>
		)
	}
)

// @View('BB')    <= looks like this with decorator syntax
const BBView = View(routes.BB)(
	function (props) {
		return (
			<p {...props}>
				{`This is not ${props.params}`}
			</p>
		)
	}
)

class Views extends React.Component {
	render() {
		return (
			<Provider value={this.props.viewsState}>
				{this.props.children}
			</Provider>
		)
	}
}

class App extends React.Component {
	state = {
		views: {
			location: routes.AA,
			params: null
		}
	}

	currentLocation = () => {
		return this.state.views.location
	}

	resetMessage = () => {
		this.setState({ views: { location: routes.AA }})
	}

	showMessage = (message) => {
		this.setState({
			views: {
				location: routes.BB,
				params: message
			}
		})
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<Views viewsState={this.state.views}>
						<AAView />
						<BBView style={{color: 'red'}}/>
					</Views>
					<button
						onClick={() => {
							if (this.currentLocation() === routes.AA)
								return this.showMessage('sushi')

							return this.resetMessage()
						}}
						>
						{ this.currentLocation() === routes.AA ? 'Show Message' : 'Reset' }
					</button>
				</header>
			</div>
		);
	}
}
export default App;
