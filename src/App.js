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

type BBProps = {
  params: string,
  color: string
}

// @View('BB')    <= looks like this with decorator syntax
const BBView = View(routes.BB)<BBProps>(
	function ({params, color, ...props}: BBProps) {
		return (
			<p style={{color: color}} {...props}>
				{`This is not ${params}`}
			</p>
		)
	}
)

type S = {
  views: RouterState
}

class App extends React.Component<{}, S> {
	state: S = {
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
						<BBView color={'red'}/>
					</Views>
					<button
						onClick={() => {
							if (this.currentLocation() === routes.AA) {
                this.showMessage('sushi')
              } else {
                this.resetMessage()
              }
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
