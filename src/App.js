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

const AAView = View('AA')(
	function (props) {
		return (
			<p {...props}>
				Lolololcats for dayz
			</p>
		)
	}
)

const BBView = View('BB')(
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
			location: 'AA',
			params: null
		}
	}

	currentLocation = () => {
		return this.state.views.location
	}

	resetMessage = () => {
		this.setState({ views: { location: 'AA' }})
	}

	showMessage = (message) => {
		this.setState({
			views: {
				location: 'BB',
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
							if (this.currentLocation() === 'AA')
								return this.showMessage('sushi')

							return this.resetMessage()
						}}
						>
						{ this.currentLocation() === 'AA' ? 'Show Message' : 'Reset' }
					</button>
				</header>
			</div>
		);
	}
}
export default App;
