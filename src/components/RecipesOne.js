import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from './Header'
import Nav from './Nav'

// Innehåller information för rutten och hur den matchar urlen
const RecipesOne = ({match}) => {

	const [recipe, setRecipe] = useState([]);

		useEffect(() => {
			getData();
		}, [])
 

	const APP_ID = '84ed91cd'
	const APP_KEY = 'dca92f210cbeafa784ca11daf4faa6a6'
	/*
	params ett objekt som är en av de properties som finns 
	i match objektet. Params består av key och value, key 
	är det namn som vi valde i skapandet 
	av routen och värdet är det värde som finns i urlen, vilket
	i vårt fall är label. Detta stoppas in urlen som används för 
	att hämta information från apiet.
	*/
	const url = `https://api.edamam.com/search?q=${match.params.id}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=1`
	

	const getData = async () => {
		const result = await fetch(url)
		let data = await result.json()
		
		setRecipe(data.hits)
		console.log(data.hits);
	}
	
	return (
	<div>
		<div className="nav"><Nav /></div>
		<Header />
		<div className="single-container">
			{recipe.map(recipeItem => (
				<div className="card-item single-container--size" key={uuidv4()}>
					<img src={recipeItem.recipe.image} alt={recipeItem.recipe.label} />
					<h3>{recipeItem.recipe.label}</h3>
					{recipeItem.recipe.ingredients.map(ingredient => (
						<ul key={uuidv4()}>
							<li className="card-text">
								{ingredient.text}
							</li>
						</ul>
					))}
					<a 
					href={recipeItem.recipe.url}
					rel="noopener noreferrer"
					target="_blank"
					>
					<h4>For Full Recipe</h4>
					</a>
				</div>
			))}
			{recipe.map(item => (
				<div key={uuidv4()} className="card-item single-container--size">
					<h4>Nutritional value</h4>
					{item.recipe.digest.map(itemDi => (
						<p className="card-text" key={uuidv4()}>{itemDi.label}: {itemDi.total}</p>
					))}
					<p key={uuidv4()}>Calories: {item.recipe.calories}</p>
				</div>
			))}
		</div>
	</div>
	)
}

export default RecipesOne


