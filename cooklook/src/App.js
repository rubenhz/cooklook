import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Recipe from './components/Recipe';
import {useState} from 'react'

function App() {

  const [recipes, setRecipes] = useState([])

  const recipeElements = recipes.map(recipe => {
    return <Recipe key={recipe.recipe.uri} {...recipe.recipe} />
  })

  return (
    <div className="App">
      <Header />
      <main>
        <Search setRecipes={setRecipes} />
        <p className="app--results">Results: {recipes.length}</p>
        {recipeElements}
      </main>
    </div>
  );
}

export default App;
