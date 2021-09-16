import React from 'react';
import styles from './styles/pagination.module.css';

export const Pagination = ({allRecipes, pagedNumber, recipePerPage}) => {

    const pages = [];

    for(let i = 1; i < Math.ceil(allRecipes / recipePerPage); i++) {
        pages.push(i);
    }
    return (
        <div className={styles.paginationContainer}>

                {
                   pages.length>1 && pages.map ( el => (
                        <div  key={el}> 
                            <button className={styles.page} onClick={()=>{pagedNumber(el)}}>{el}</button>
                        </div>
                    ))
                }
         
        </div>
    )
}
