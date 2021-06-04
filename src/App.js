import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import {
	Link
} from "react-router-dom";
import './App.css'
import Header from './components/Header'
import { FaSearch } from "react-icons/fa";
import Nav from './components/Nav'

 
const App = () => {

	const [query, setQuery] = useState('');
	const [recipes, setRecipe] = useState([]);
	const [error, setError] = useState('');

	const APP_ID = '84ed91cd'
	const APP_KEY = 'dca92f210cbeafa784ca11daf4faa6a6'
	const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=30`
	
	

	const getData = async () => {

			const result = await fetch(url)
			let data = await result.json()
			console.log(data.hits);
			setError('') //Tar bort felmeddelandet om recept hittas
			setQuery('') // Noll ställer det du skrivit i sökrutan
			setRecipe(data.hits)

			// Kollar om receptet finns i API:et
			if (!data.more) {
				return setError('Your search is unavailable');
			}
	}

	const onSubmit = (e) => {
		e.preventDefault();
		getData();
	}

	const onChange = (e) => {
		setQuery(e.target.value);
	}

	return (
		<div className="main">
			<form className="form" onSubmit={onSubmit}>
				<Nav />
				<input 
				onChange={onChange} 
				type="text" 
				value={query}
				placeholder="SEARCH FOR MEALS"
				required
				/>
				<button type="submit"><span><FaSearch /></span></button>
			</form> 
			{/*Om recept ej finns, visa error meddelandet satt i setError */}
			{error !== '' && <h5 className="error">{error}</h5>} 
			<Header />
			<div className="container">
				{recipes !== [] && recipes.map(recipe =>
					<div key={uuidv4()} className="card-item">
					{/* Link tar dig till recipe och tar med sig information, i detta fall label */}
					<Link to={`/recipesone/${recipe.recipe.label}`
						}><img src={recipe.recipe.image} alt={recipe.recipe.label} /></Link>
					<h3>{recipe.recipe.label}</h3>
				</div>
				)}
			</div>
		</div>
	)
}

export default App 



