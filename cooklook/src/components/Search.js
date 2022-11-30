import React, {useState, useEffect} from 'react'
import searchIcon from '../images/search-icon.png'

export default function Search(props) {

    const [search, setSearch] = useState('')
    const [seachQuery, setSearchQuery] = useState('')

    function handleChange(e) {
        setSearch(e.target.value)
    }

    function handleClick() {
        setSearchQuery(search)
    }

    function handleKeyPressed(e) {
        e.keyCode === 13 && handleClick()
    }

    useEffect(() => {
        // app_id and app_key DO NOT INCLUDE IN DEPLOYED BUILD!!! ***
        const app_id = 'da33b67e'
        const app_key = '83d924f89865c5661533a14d2953d6d6'
        const endpoint = `?type=public&q=${seachQuery}&app_id=${app_id}&app_key=${app_key}&random=true`
        if (seachQuery) {
            fetch('https://api.edamam.com/api/recipes/v2'+endpoint)
                .then(res => res.json())
                .then(data => props.setRecipes(data.hits))
        } else {
            props.setRecipes([])
        }
    }, [seachQuery])

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