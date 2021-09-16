const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const {getRecipes, getRecipeById, postRecipe , getDiets} = require ('../controlers/index');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipeById);
router.post("/recipes", postRecipe);


router.get("/diets", getDiets);

module.exports = router;
