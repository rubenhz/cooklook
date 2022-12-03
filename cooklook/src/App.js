import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Recipe from './components/Recipe';
import {useState, useEffect} from 'react'
import {updateLikedRecipesInLS} from './utils'
import burgerGif from './images/spinning-burger.gif'
import startSearching from './images/start-searching.png'

function App() {

  const [recipes, setRecipes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    updateLikedRecipesInLS(recipes)
  }, [recipes])

  const recipeElements = recipes.map(recipe => {
    return <Recipe key={recipe.uri} setRecipes={setRecipes} recipes={recipes} {...recipe} />
  })

  function renderMain() {
    if (recipes.length > 0 && searchQuery) {
      return (
        <>
        <p className="app--results">Results: {recipes.length}</p>
        {recipeElements}
        </>
      )
    }
    else if (recipes.length === 0 && searchQuery) {
      return <Loading />
    }
    else {
      return <img 
        className='app--start-searching' 
        src={startSearching}
        alt='Cute burger saying "Start Searching!!"'
      />
    }
  }

  return (
    <div className="App">
      <Header recipes={recipes} setRecipes={setRecipes}/>
      <h1 className='app--intro'>
        Over 2.3 million recipes to discover
      </h1>
      <main>
        <Search 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          setRecipes={setRecipes} 
        />
        {renderMain()}
      </main>
    </div>
  );
}

function Loading() {

  const [afterTimeOut, setAfterTimeOut] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setAfterTimeOut(true), 3000)
    console.log('loading mounted')
    return () => clearTimeout(id)

  }, [])

  return (
    <>
      <img className='app--burger-gif' src={burgerGif} alt=''/>
      {
        afterTimeOut &&
        <p className='app--nothing-found'>Nothing Found</p>
      }
    </>
  )
}

export default App;
