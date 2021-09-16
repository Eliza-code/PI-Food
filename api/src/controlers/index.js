const axios = require ('axios');
const {getAllRecipes, getDbRecipes, dataRecipe, upperFirst} = require ('../utils/index');
const {Diet, Recipe} = require ('../db');
require('dotenv').config();
const {API_KEY} = process.env



const getRecipes = async (req, res) => {
    const {name} = req.query
    try{
        if (name) {
    
            const recipeDb = await getDbRecipes();
            const response = recipeDb.filter( el => el.title.toLowerCase().includes(name.toLowerCase()));

            let recipeApi;
            try{
                const {data} =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&query=${name.toLowerCase()}`);

                recipeApi = data.results.slice(0,9).map( (el) => dataRecipe(el))

            }catch (err) {
                console.log(err);
            }
            const recipeName = response ? response.concat(recipeApi).slice(0,9) : recipeApi;

            return recipeName.length ? res.status(200).json(recipeName) : res.status(400).send('Recipe not found');
            
        }else {
            const recipes = await getAllRecipes();
            return  res.status(200).json(recipes);

        }
    }catch (err) {
        console.log(err);
    }
}

const getRecipeById = async (req, res) => {
    
    const {id} = req.params;
    try{
       
        if(id.length > 30){
            const recipeDb = await Recipe.findByPk(id, {
                include : {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });
            return recipeDb? res.status(200).json(recipeDb) : res.status(400).send('Not Found');
        }else {
            let recipeApi;
            try{
                const {data} = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
                recipeApi = {
                    title: data.title,
                    id: data.id ,
                    summary:data.summary,
                    image : data.image,
                    score: data.spoonacularScore,
                    healthScore:data.healthScore,
                    instructions: data.instructions,
                    diets: data.diets.map( el => ({name: upperFirst(el)}))
                };

            } catch (err) {
                console.error(err)
            }
            
            return recipeApi? res.status(200).json(recipeApi) : res.status(400).send('Not Found');
        }
    }catch (err){
        console.log(err);
    }
}

const getDiets = async (req, res) => {
   
    try {
        const getDiet = await Diet.findAll();
        if(getDiet.length){
            return res.status(200).json(getDiet) ;
        } else {
            try{
                await Diet.bulkCreate([
                    { name: "Gluten Free" },
                    { name: "Ketogenic" },
                    { name: "Vegetarian" },
                    { name: "Lacto-Vegetarian" },
                    { name: "Ovo-Vegetarian" },
                    { name: "Vegan" },
                    { name: "Pescetarian" },
                    { name: "Primal" },
                    { name: "Whole30" }
                ]);
            }catch (err) {
                console.error(err);
            }
            const getDiet = await Diet.findAll();
            return  res.status(200).json(getDiet);
        }
    } catch (err) {
        console.error(err);
    }
}

const postRecipe = async (req, res) => {  
    const {title, summary, image, score, healthScore, instructions, diets} = req.body;
    try {
        const recipe = await Recipe.create({ 
            title, 
            summary, 
            image: image==='' ? undefined : image, 
            score, 
            healthScore, 
            instructions
        })
        const dietDb = await Diet.findAll({ 
            where : {name : diets}
        })
    
        await recipe.addDiet(dietDb);

        return  res.status(200).send('Recipe created succesfully')
    }catch (err) {
        console.error(err);
    }
}





module.exports = {
    getRecipes,
    getRecipeById,
    postRecipe,
    getDiets
}

