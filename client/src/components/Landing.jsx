import React from 'react';
import {Link} from 'react-router-dom';
import styles from './styles/landing.module.css';
import logo from '../images/logo-white.png';


const Landing = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.btnLanding}>
                <img src={logo} alt="logo" />
                <Link to= '/home'>
                    <button className={styles.btn}>Welcome!</button>
                </Link>
            </div>
        </div>
     );
}
 
export default Landing;