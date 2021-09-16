import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Card from './Card';
import {getRecipes, getByName, getDiets} from '../actions/index';
import Filters from './Filters';
import { Pagination } from './Pagination';
import styles from './styles/home.module.css';
import logo from '../images/logo-white.png';



const Home = () => {

    const [order, setOrder] = useState('') 
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);

    //-- Error
    const error = useSelector(state => state.error);
    const message = useSelector(state => state.message);

    //--- Search bar
    const [name, setName] = useState('')

    //-----Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const recipePerPage = 9;
    const indexLastRecipe = currentPage * recipePerPage ;
    const indexFirstRecipe = indexLastRecipe - recipePerPage ;
    const recipeCurrentPage = recipes.slice(indexFirstRecipe, indexLastRecipe); 
        
    const pagedNumber = (page) => {
        setCurrentPage(page);
    }

    useEffect(() =>{ 
        dispatch(getRecipes())
        dispatch(getDiets())
    },[dispatch])
    
    const handleInputChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getByName(name.trim()));
        setName('')
    }

    return ( 
        <div className={styles.homeContainer}>
           <div className={styles.title}>
                <div className={styles.btnLink}>
                    <Link to= '/create' className={styles.btnCreate}>
                        <button className={styles.linkCreate}  >
                            Create your own!
                        </button>
                    </Link>
                </div>
                
                <img className={styles.img} src={logo} width='150px' height='100px' alt='logo' />

                <div className={styles.search}>
                    <form onSubmit={handleSubmit}>
                        <input className={styles.searchInput} onChange={handleInputChange} type="text" required placeholder="Pasta.." name='name' value={name}/>
                        <button type="submit">Search</button>
                    </form>
                </div>

                <Filters setOrder={setOrder} />

           </div>
           <div>
               <div className={styles.cards}>
                {
                    !error ? recipeCurrentPage && recipeCurrentPage.map( el => {
                        return (
                            <Link className={styles.cardText} to={'/recipe/' + el.id} key={el.id}>
                                <Card id={el.id} image={el.image} title={el.title} diets={el.diets} />
                            </Link>
                        )
                    }) : <h3>{message}</h3>
                }
                </div>
                { !error && <Pagination recipePerPage = {recipePerPage} pagedNumber={pagedNumber} allRecipes = {recipes.length} />}
            </div>
        </div>
     );
}
 
export default Home;