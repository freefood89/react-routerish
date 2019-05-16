// @flow
import * as React from 'react';
import logo from './logo.svg';
import './App.css';

const routes = {
	AA: 'AA',
	BB: 'BB'
}

type RouterState = {
  location: string,
  params?: any
}

const {
  Provider,
  Consumer
}: React.Context<RouterState> = React.createContext({ location: routes.AA })

const View = (path: string) =>
  <Config: {}>(Component: React.AbstractComponent<Config>): React.AbstractComponent<$Diff<Config, {params: any}>> => {
    return function(props: $Diff<Config, {params: any}>) {
      return (
        <Consumer>
          {({location, params}) => {
            if (location === path) {
              return (
                <React.Fragment>
                  <Component params={params} {...props} />
                </React.Fragment>
              )
            } else {
              return null
            }
          }}
        </Consumer>
      )
    }
  }

type Props = {
  routerState: RouterState,
  children: React.Node
}

const Views = (props: Props) => {
  return (
    <Provider value={props.routerState}>
      {props.children}
    </Provider>
  )
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





type S = {
  views: RouterState
}

class App extends React.Component<{}, S> {
	state = {
		views: {
			location: routes.AA,
			params: null
		}
	}

  setRouterState = (r: RouterState) => {
    this.setState({ views: r })
  }

	currentLocation = () => {
		return this.state.views.location
	}

	resetMessage = () => {
		this.setRouterState({ location: routes.AA })
	}

	showMessage = (message: string) => {
		this.setRouterState({
      location: routes.BB,
      params: message
		})
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<Views routerState={this.state.views}>
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
