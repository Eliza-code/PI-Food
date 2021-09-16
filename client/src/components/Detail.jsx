import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getDetail} from '../actions/index';
import styles from './styles/detail.module.css';
import NavBar from './NavBar';
import gif from '../images/git.gif';

const Detail = (props) => {
    const {id} = props.match.params;

    const recipe = useSelector(state => state.detail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])
    

    return ( 
        <div className={styles.mainContainer}>
            <NavBar />
            {
                Object.keys(recipe).length > 0 ? (
                <div className={styles.detailContainer}>
                    <h3 className={styles.detailTitle}>{recipe.title}</h3>
                    <div className={styles.detailDescription}>
                        <div className={styles.detailLeft}>
                            <img src={recipe.image} alt='' width="200px" height="200px" />
                            <h5>Diet's types: {recipe.diets.map(el => el.name ).join(', ')}</h5>
                            <h5>Score: {recipe.score}</h5>
                            <h5>Health Score: {recipe.healthScore}</h5>
                        </div>
                        <div className={styles.detailRigth}>
                            <h5>Summary: </h5>
                            <p dangerouslySetInnerHTML={{__html: recipe.summary}} />
                            <h5> Instrunctions: </h5>
                            <p dangerouslySetInnerHTML={{__html: recipe.instructions || '<p>None</p>'}} />
                        </div>
                    </div> 
                </div>
                ): <div>
                        <img src={gif} alt="loading" />
                        <p>Loading...</p> 
                    </div>
            }
        </div>
     );
}
 
export default Detail;