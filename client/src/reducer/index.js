const initialState = {
    allRecipes: [],
    recipes: [],
    diets:[],
    detail: {},
    error: false, 
    message: ''
}


const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "ERROR" :
            return {
                ...state,
                error: true,
                message: action.payload
            }
        case "GET_RECIPES":
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case "GET_DETAIL": 
            return{
                ...state,
                detail: action.payload
            }

        case "GET_BY_NAME":
            return{
                ...state,
                recipes: action.payload
            }
        
        case "GET_DIETS" : 
            return {
                ...state,
                diets: action.payload
            }
        case "ADD_RECIPE":
            return {...state}
        
        case "FILTER_BY_DIET":
            
            const recipesAll = state.allRecipes
            const filterDiet = recipesAll.filter( el=> (el.diets.find ( el => el.name.toLowerCase() === action.payload.toLowerCase())))

            return{
                ...state,
                recipes: action.payload === 'all' ? recipesAll : filterDiet
            }

        case "FILTER_ALPHABETICALLY": 
        
            const filterAlphabetic = action.payload === 'asc' ?  state.recipes.sort((a, b) => {
                return a.title > b.title ?   1 :  -1;
                
              }) : action.payload === 'desc' ? state.recipes.sort((a, b) => {
                return a.title < b.title ?  1 : -1; 

              }) :  state.allRecipes ;
            return {
                ...state,
                recipes: filterAlphabetic
            }

        case "FILTER_BY_SCORE":
           
            const filterScore = action.payload === 'min' ? state.recipes.sort((a,b) => {
                return a.score - b.score}) : state.recipes.sort((a,b) => {
                    return b.score - a.score})
            return {
                ...state,
                recipes: action.payload === 'default' ? state.allRecipes : filterScore
            }

        default: 
            return state;
    }
};
 
export default rootReducer;