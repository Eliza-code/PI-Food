import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {filterByDiet, filterAlphabetically, filterByScore} from '../actions/index'; 
import styles from './styles/filter.module.css';



const Filters = ({setOrder}) => {

    const recipes = useSelector(state=> state.allRecipes);
    const renderDiets = recipes?.map((elem) => elem.diets)
    .flat()
    .reduce((acc, elem) => {
        if (!acc.includes(elem.name)) acc.push(elem.name);
        return acc;
    }, []);    
   
    const dispatch = useDispatch();

    const handleAlphabetically = (e) => {
        dispatch(filterAlphabetically(e.target.value));
        setOrder(e.target.value);
    }
    const handleScore = (e) => {
        dispatch(filterByScore(e.target.value));
        setOrder(e.target.value);
    }
    const handleDiets = (e) => {
        dispatch(filterByDiet(e.target.value));
    }

    return ( 
        <div className={styles.filterContainer}>
            <div className={styles.filter}>
                <h4>Sort Alphabetically</h4>
                <select className={styles.select} onChange = {handleAlphabetically}>
                    <option value='default' hidden>-</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
            </div>
            <div className={styles.filter}>
            <h4>Sort by Score</h4>
            <select className={styles.select} onChange = {handleScore}>
                <option value='default' hidden>-</option>
                <option value='min' >Min Score</option>
                <option value='max'>Max Score</option>
            </select>
            </div>
            <div className={styles.filter}>
            <h4>Order by Diets</h4>
            <select className={styles.select} onChange = {handleDiets}>
                <option value='default' hidden>-</option>
                <option value='all'>All</option>
                { renderDiets?.map( el => {
                    return (
                        <option key={el} value={el}>{el}</option>
                    )
                })}
            </select>
            </div>
        </div>
    );
}
 
export default Filters;