import React, {useState} from 'react'
import heartIcon from '../images/heart-icon.png'
import filledHeartIcon from '../images/filled-heart-icon.png'

export default function Recipe(props) {

    const [liked, setLiked] = useState(false)

    const tags = props.healthLabels.map(tag => {
        return (
            <div key={tag} className='recipe--tag'>
                {tag}
            </div>
        )
    })

    return (
        <div className='recipe'>
            <div 
                className='recipe--heart'
                onClick={() => setLiked(prev => !prev)}
                >
                {
                    liked ? 
                        <img src={filledHeartIcon} alt='filled heart icon'/>
                        : <img src={heartIcon} alt='heart icon outline'/>
                }
            </div>
            <img className='recipe--image' src={props.images.SMALL.url} alt='recipe thumbnail'/>
            <div className='recipe-info'>
                <h2 className='recipe--label'>{props.label}</h2>
                <a 
                    className='recipe--url' 
                    href={props.url}
                    >
                    <img 
                        className='recipe--favicon'
                        src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${props.url}`}
                        alt='recipe source website favicon'
                    />
                    {props.url.slice(0, 30)+'...'}
                </a>
                <div className='recipe--tags'>
                    {tags.slice(0, 3)}
                </div>
            </div>
        </div>
    )
}