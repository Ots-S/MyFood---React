import React, { useState, createContext } from "react"
import axios from "axios"

const Context = createContext();

function ContextProvider(props) {
    const [ingredients, setIngredients] = useState([])
    const [recipes, setRecipes] = useState([])
    const [getError, setGetError] = useState()

    function getIngredients() {
        axios.get("/ingredients").then(responses => setIngredients(responses.data)).catch(error => setGetError(error.response.status))
    }

    function getRecipes() {
        axios
            .get("/recipes")
            .then(responses => setRecipes(responses.data))
            .catch(error => setGetError(error.response.status));
    }

    return <Context.Provider value={{ ingredients, getIngredients, recipes, getRecipes, getError, setGetError }}>
        {props.children}
    </Context.Provider >
}

export { Context, ContextProvider }