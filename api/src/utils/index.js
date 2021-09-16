//API_KEY=87b28d5343474a37a537a17a22ef87af
//API_KEY=8b0c488586be4b45af94fc3630b0f826

require('dotenv').config();
const axios = require ('axios');
const {Diet, Recipe} = require ('../db');
const {API_KEY} = process.env


// get all recipes from the database
const getDbRecipes = async () => {
    try{
        const dBrecipes = await Recipe.findAll({
            attributes: ['id', 'title', 'image'],
            include : {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return dBrecipes;
    }catch (err) {
        console.log(err);
    }
}

const upperFirst = (str) => {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
  };

// function model from home data
const dataRecipe = (data) => {
    return {
        title:data.title,
        id: data.id,
        diets: data.diets.map( el=> ({name: upperFirst(el)})),
        image: data.image,
        score: data.spoonacularScore,
        healthScore:data.healthScore
    }
};


// gets all recipes from API
const getApiRecipesHome = async () => {
    try{
        const {data} = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const result = data.results.map( (el) => dataRecipe(el))
        return result;

    } catch (err) {
        console.log(err);
    }
}

const getAllRecipes = async () => {
    
    const dbRecipe = await getDbRecipes();
    const apiRecipe = await getApiRecipesHome();

    return dbRecipe ? dbRecipe.concat(apiRecipe) : apiRecipe;
}

module.exports = {
    getAllRecipes, getDbRecipes, dataRecipe, upperFirst
}