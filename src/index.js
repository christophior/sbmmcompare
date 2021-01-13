import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './scenes/Home';
import Compare from './scenes/Compare';
import Player from './scenes/Player';

import './styles.css';

const App = () => {
	return (
		<div style={{ height: 'calc(100% - 70px)' }}>
			<nav
				style={{ height: '5rem', display: 'flex', justifyContent: 'center' }}
			>
				<a href="/" style={{ margin: 'auto' }}>
					Home
				</a>
			</nav>
			<div style={{ height: '100%' }}>
				<Router>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route
							path="/compare/:platform1/:gamertag1/:platform2/:gamertag2"
							component={Compare}
						/>
						<Route path="/player" component={Player} />
						<Route component={() => <p>whoops</p>} />
					</Switch>
				</Router>
			</div>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
