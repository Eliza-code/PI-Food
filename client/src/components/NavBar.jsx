import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo-white.png';
import styles from './styles/navBar.module.css';


const NavBar = () => {
    return ( 
        <div className={styles.navBar}>
            <Link to="/home" > <img src={logo} alt="logo" /></Link>
        </div>
     );
}
 
export default NavBar;