import React, {useState, useEffect} from 'react'
import heartIcon from '../images/heart-icon.png'
// import menuIcon from '../images/menu-icon.png'
import LikedRecipes from './LikedRecipes'
import { getLikedRecipesFromLocalStorage } from '../utils'


export default function Header({recipes, setRecipes}) {

    const [showSavedRecipes, setShowSavedRecipes] = useState(false)
    const [savedRecipes, setSavedRecipes] = useState(getLikedRecipesFromLocalStorage())

    useEffect(() => {
        function handleStorageChange() {
            setSavedRecipes(getLikedRecipesFromLocalStorage())
        }
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    

    return (
        <div className='header'>
            <div className='header--content'>
            <p className='header--logo'>CookLook</p>
            <div className='header--icons'>
                <div 
                    onClick={() => setShowSavedRecipes(prev => !prev)} 
                    className='header--heart-icon-container'
                    >
                    <div className='header--saved-recipes-counter'>
                        {savedRecipes.length}
                    </div>
                    <img 
                        className='header--heart-icon' 
                        src={heartIcon}
                        alt='heart icon'
                    />
                </div>
                {/* <div>
                    <img 
                        className='header--menu-icon' 
                        src={menuIcon}
                        alt='hamburger menu icon'
                    />
                </div> */}
            </div>
            
            {showSavedRecipes &&
            <LikedRecipes recipes={recipes} setRecipes={setRecipes} savedRecipes={savedRecipes} />}
            </div>
        </div>
    )
}