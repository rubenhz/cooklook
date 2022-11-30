import React from 'react'
import heartIcon from '../images/heart-icon.png'
import menuIcon from '../images/menu-icon.png'

export default function Header() {
    return (
        <div className='header'>
            <p className='header--logo'>CookLook</p>
            <div className='header--icons'>
                <img 
                    className='header--heart-icon' 
                    src={heartIcon}
                    alt='heart icon'
                />
                <img 
                    className='header--menu-icon' 
                    src={menuIcon}
                    alt='hamburger menu icon'
                />
            </div>
        </div>
    )
}