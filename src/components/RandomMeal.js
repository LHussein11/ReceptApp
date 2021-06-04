import React, {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import Header from './Header'
import Nav from './Nav'

const RandomMeal = () => {

	const [random, setRandom] = useState([]);

	useEffect(() => {
		getData();
	}, [])


	const APP_ID = '84ed91cd'
	const APP_KEY = 'dca92f210cbeafa784ca11daf4faa6a6'

	const url = `https://api.edamam.com/search?q=meat,chicken,fish,bread&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=30`


	const getData = async () => {
		const result = await fetch(url)
		const data = await result.json()

		const res = data.hits;
		console.log(data.hits);

		/*
		Vi stoppar in i variablen ett random nummer baserat på arrayens längd som vi
		har hämtat från API:et
		*/
		const rand = Math.floor(Math.random() * res.length);

		/*
		Ett random element i arrayen hämtas då man stoppar
		in random variablen som är baserad på arrayens längd,
		elementet hämtas via index positionen
		*/
		const randomMeal = res[rand]
		console.log(randomMeal.recipe);

		setRandom(randomMeal.recipe)
	}

/*
Kolla för nullvärden/falsy och stoppa in i en variabel
uuidv4 ger ett unikt number som används som key
*/
let ingredients = null;
if (random && random.ingredients) {
	ingredients = random.ingredients.map(ingredient => {
		return (
			<p className="card-text" key={uuidv4()}>{ingredient.text}</p>
			)
		});
	}

let nutri = null;
if(random && random.digest) {
	nutri = random.digest.map(itemNutri => {
		return (
			<p className="card-text" key={uuidv4()}>{itemNutri.label}: {itemNutri.total}</p>
		)
	})
}


	return (
		<div className="randomWrapper">
			<div className="nav"><Nav /></div>
			<Header />
			<h1>Our suggestion</h1>
			<div className="single-container">
				<div className="card-item single-container--size">
				<img src={random.image} alt={random.label} />
				<h3>{random.label}</h3>
				{ingredients}
				<a 
				rel="noopener noreferrer" 
				target="_blank" 
				href={random.url}><h4>For Full Recipe</h4></a>
				</div>
				<div className="card-item single-container--size">
					<h4>Nutritional value</h4>
				{nutri}
				</div>
			</div>
		</div>
	)
}

export default RandomMeal


