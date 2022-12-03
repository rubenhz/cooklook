import React, {useState, useEffect} from 'react'
import searchIcon from '../images/search-icon.png'
import {getLikedRecipesFromLocalStorage} from '../utils'

export default function Search(props) {

    const setRecipes = props.setRecipes // This is a function

    const [search, setSearch] = useState('')

    function handleChange(e) {
        setSearch(e.target.value)
    }

    function handleClick() {
        props.setSearchQuery(search)
    }

    function handleKeyPressed(e) {
        e.keyCode === 13 && handleClick()
    }

    useEffect(() => {
        // app_id and app_key DO NOT INCLUDE IN DEPLOYED BUILD!!! ***
        const app_id = 'da33b67e'
        const app_key = '83d924f89865c5661533a14d2953d6d6'
        const endpoint = `?type=public&q=${props.searchQuery}&app_id=${app_id}&app_key=${app_key}&random=true`
        if (props.searchQuery) {
            fetch('https://api.edamam.com/api/recipes/v2' + endpoint)
                .then(res => res.json())
                .then(data => {
                    const recipes = data.hits.map(recipe => {
                        const localStorageUris = getLikedRecipesFromLocalStorage().map(r => r.uri)
                        if (localStorageUris.includes(recipe.recipe.uri)) {
                            return {...recipe.recipe, isLiked: true}
                        } else {
                            return {...recipe.recipe, isLiked: false}
                        }
                        
                    })
                    setRecipes(recipes)
                })
        } else {
            setRecipes([])
        }
    }, [props.searchQuery, setRecipes])

    return (
        <div className='search'>
            <p className='search--prompt'>
                Search recipes by name or ingredients
            </p>
            <input 
                className='search--input'
                onChange={handleChange}
                onKeyDown={handleKeyPressed}
                value={search}
                type='text' 
            />
            <button 
                className='search--button' 
                onClick={handleClick}
                >
                <img 
                    className='search--magnifying-glass-icon' 
                    src={searchIcon} 
                    alt='search icon' 
                />
            </button>
        </div>
    )
}