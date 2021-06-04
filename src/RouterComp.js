import React from 'react'
import App from './App'
import RecipesOne from './components/RecipesOne'
import RandomMeal from './components/RandomMeal'
import {
	HashRouter as Router, Route,
	Switch
} from "react-router-dom";
import logo from './images/logo.png'

const RouterComp = () => {
	return (
		<Router>
			<img className="logo" src={logo} alt="logo" />
			<div>
				<Switch>
					<Route exact path="/" component={App} />

					<Route path="/recipesone/:id" component={RecipesOne} />

					<Route path="/randommeal" component={RandomMeal} />
				</Switch>
			</div>
		</Router>
	)
}

export default RouterComp
