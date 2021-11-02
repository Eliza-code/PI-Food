import axios from 'axios';

export const getRecipes = () => {
    return async (dispatch) => {
        try{
            const data= await axios.get('/recipes')
            .then(resp => {
               if(resp.status === 200){
                   return resp.data;
               }else if( resp.status !== 200){
                   return [];
               }
            }).catch (err => [])
            if(data.length > 0) {
                return dispatch ({
                    type: 'GET_RECIPES',
                    payload: data
                })
            }else {
                return dispatch( {
                    type : "ERROR",
                    payload : "System Error, try later!"
                })
            }
        }catch (err){
            return dispatch( {
                type : "ERROR",
                payload : "System Error1, try later!"
            })
        }
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        try{
            const {data} = await axios.get(`/recipes/${id}`);
            return dispatch ({
                type: 'GET_DETAIL',
                payload: data
            })
        } catch (err) {
            console.error(err);
        }
    }
}

export const getByName = (name) => {
    return async (dispatch) => {
        try{
           const {data} = await axios.get(`/recipes/?name=${name}`)
            return dispatch({
                   type: 'GET_BY_NAME',
                   payload: data
            })
        }catch(err){
            return dispatch( {
                type : "ERROR",
                payload : "The recipe does not exist!"
            });
        }
    }
}

export const getDiets = () => {
    return async (dispatch) => {
        try{
            const {data} = await axios.get('/diets')
            return dispatch({
                type : 'GET_DIETS',
                payload : data
            })
        }catch(err){
            console.error(err);
        }
    }
}

export const postRecipe = (input) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/recipes', input)
            return response;
        }catch (err) {
            console.error(err);
        }
    }
}

//------------Filters

export const filterByDiet = (payload) => {
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export const filterAlphabetically = (payload) => {
    return {
        type: 'FILTER_ALPHABETICALLY',
        payload
    }
}

export const filterByScore = (payload) => {
    return {
        type: 'FILTER_BY_SCORE',
        payload
    }
}
