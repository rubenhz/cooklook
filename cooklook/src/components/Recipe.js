import React, {useState} from 'react'
import heartIcon from '../images/heart-icon.png'
import filledHeartIcon from '../images/filled-heart-icon.png'
import { updateLikedRecipesInLS } from '../utils'

export default function Recipe(props) {

    const [revealAnimation, setRevealAnimation] = useState(false)
    const [hideAnimation, setHideAnimation] = useState(false)

    const animationClass = `
        recipe--more-info ${
            revealAnimation ? 
                'reveal-animation'
                : !revealAnimation && hideAnimation ?
                'reveal-animation-backwards'
                : ''
        }
    `

    const tags = props.dietLabels.map(tag => {
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

    function handleClickedMoreInfo() {
        setRevealAnimation(prev => {
            setHideAnimation(prev)
            return !prev
        })
    }

    function nutrientListElements(nutrientKeysWanted) {
        return Object.keys(props.totalNutrients).map(nutrientKey => {
            if (nutrientKeysWanted.includes(nutrientKey)) {
                return (
                    <div className='recipe--list-item'>
                        <p>{props.totalNutrients[nutrientKey].label}</p>
                        <p>
                            {Math.floor(props.totalNutrients[nutrientKey].quantity)}
                            &nbsp;
                            {props.totalNutrients[nutrientKey].unit}
                        </p>
                    </div>
                )
            } else { return null }
        })
    }

    return (
        <div className='recipe'>
            <div className='recipe--main'>
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
                        style={props.compact && {width: '100px'}}
                    />
                </div>
                <div className='recipe--info'>
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
                        {props.url.split('/')[2].replace('www.', '')}
                    </a>
                    <h2 style={props.compact && {fontSize: '17px'}} className='recipe--label'>{props.label}</h2>
                    <div className='recipe--tags'>
                        {tags.slice(0, 3)}
                    </div>
                    {
                        !props.compact &&
                        <button 
                            className='recipe--more-info-btn'
                            onClick={handleClickedMoreInfo}
                            >
                            More Info
                        </button>
                    }
                </div>
            </div>
            {/* recipe--more-info grows with animation */}
            <div 
                className={animationClass}
                > 
                <div className='recipe--more-info-main'>
                    <div className='recipe--calories'>
                        <p className='recipe--servings'>{props.yield} servings</p>
                        <p className='recipe--calories-number'>
                            {Math.floor(props.calories/props.yield)}
                            <span>kcal</span>
                        </p>
                    </div>
                    <div className='recipe--energy'>
                        {nutrientListElements(['FAT', 'PROCNT', 'CHOCDF'])}
                    </div>
                    <div className='recipe--extra'>
                        {nutrientListElements([
                            'CHOLE', 
                            'NA', 
                            'CA',
                            'MG',
                            'K',
                            'FE'
                        ])}
                    </div>
                </div>
            </div>
        </div>
    )
}