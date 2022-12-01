import React from 'react'
import heartIcon from '../images/heart-icon.png'
import filledHeartIcon from '../images/filled-heart-icon.png'
import { updateLikedRecipesInLS } from '../utils'

export default function Recipe(props) {

    const tags = props.healthLabels.map(tag => {
        return (
            <div 
                key={tag} 
                className='recipe--tag'
                style={props.compact && {fontSize: '10px'}}
                >
                {tag}
            </div>
        )
    })

    function handleLiked() {
        props.setRecipes(prevRecipes => {
            return prevRecipes.map(recipe => {
                return recipe.uri === props.uri ?
                {...recipe, isLiked: !props.isLiked}
                : recipe
            })
        })
        const recipeInAppState = props.recipes.map(r => r.uri).includes(props.uri)
        if (!recipeInAppState) {
            updateLikedRecipesInLS([{uri: props.uri, isLiked: false}])
        }
    }

    return (
        <div className='recipe'>
            <div 
                className='recipe--heart'
                onClick={handleLiked}
                >
                {
                    props.isLiked ? 
                        <img src={filledHeartIcon} alt='filled heart icon'/>
                        : <img src={heartIcon} alt='heart icon outline'/>
                }
            </div>
            <div className='recipe--image-container'>
                <img 
                    className='recipe--image' 
                    src={props.images.SMALL.url} 
                    alt='recipe thumbnail'
                    style={props.compact && {width: '80px'}}
                />
            </div>
            <div className='recipe--info'>
                <h2 style={props.compact && {fontSize: '17px'}} className='recipe--label'>{props.label}</h2>
                <a 
                    className='recipe--url' 
                    href={props.url}
                    style={props.compact && {fontSize: '11px'}}
                    >
                    <img 
                        className='recipe--favicon'
                        src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${props.url}`}
                        alt='recipe source website favicon'
                    />
                    {props.url.split('/')[2]}
                </a>
                <div className='recipe--tags'>
                    {tags.slice(0, 3)}
                </div>
            </div>
        </div>
    )
}