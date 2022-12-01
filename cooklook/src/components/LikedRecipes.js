import React from 'react'
import Recipe from './Recipe'

export default function LikedRecipes({savedRecipes, recipes, setRecipes}) {

    const recipeElements = savedRecipes.map(recipe => {
        return (
            <Recipe 
                key={recipe.uri} 
                setRecipes={setRecipes} 
                recipes={recipes} 
                {...recipe}
                compact
            />
        )
    })

    return (
        <div className="liked-recipes">
            {
                savedRecipes.length > 0 ?
                    <>{recipeElements}</>
                    : <p>You have no favorite Recipes.</p>
            }
        </div>
    )
}