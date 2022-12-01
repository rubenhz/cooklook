import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Recipe from './components/Recipe';
import {useState, useEffect} from 'react'
import {updateLikedRecipesInLS} from './utils'

function App() {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    updateLikedRecipesInLS(recipes)
  }, [recipes])

  const recipeElements = recipes.map(recipe => {
    return <Recipe key={recipe.uri} setRecipes={setRecipes} recipes={recipes} {...recipe} />
  })

  return (
    <div className="App">
      <Header recipes={recipes} setRecipes={setRecipes}/>
      <main>
        <Search setRecipes={setRecipes} />
        <p className="app--results">Results: {recipes.length}</p>
        {recipeElements}
      </main>
    </div>
  );
}

export default App;
