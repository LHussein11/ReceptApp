import React from 'react'
import {Link} from 'react-router-dom'
//Navigations menyn med länkar till varje sida genom router
const Nav = () => {
	return (
		<div className="navbar">
			<Link to="/">App Page</Link>
			<Link to="/randommeal">Random Meal</Link>
		</div>
	)
}

export default Nav
