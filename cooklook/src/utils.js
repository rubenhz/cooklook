const SAVEDRECIPES = 'likedRecipes'

export function getLikedRecipesFromLocalStorage() {
    if (localStorage.getItem(SAVEDRECIPES) === null) {
        localStorage.setItem(SAVEDRECIPES, '[]')
    }
    return JSON.parse(localStorage.getItem(SAVEDRECIPES))
}

export function updateLikedRecipesInLS(recipes) {
    let localStorageRecipes = [...getLikedRecipesFromLocalStorage()]

    localStorageRecipes = [...recipes.filter(r => {
        return r.isLiked && !localStorageRecipes.map(r => r.uri).includes(r.uri)
    })].concat(localStorageRecipes)

    localStorageRecipes = localStorageRecipes.map(r => {
        if (recipes.filter(r => !r.isLiked).map(r => r.uri).includes(r.uri)) {
            return {...r, isLiked: false}
        } else {
            return r
        }
    })

    localStorage.setItem(SAVEDRECIPES, JSON.stringify(localStorageRecipes.filter(r => r.isLiked)))
    window.dispatchEvent(new Event('storage'))
}