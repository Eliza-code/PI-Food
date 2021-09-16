import React from 'react';
import styles from './styles/card.module.css';

const Card = ({title, image, diets}) => {
    return (  
        <div className={styles.cardContainer}>
            <div className={styles.image}>
                <img src={image} alt='Not found' />
            </div>
            <div className={styles.content}>
                <h4 className={styles.cardTitle}>{title}</h4>
                <h5 className={styles.diets}>
                {
                    diets.map( (el, i) => <span key={i} >{el.name+(' ')}</span> )
                }
                </h5>
            </div>
        </div>
    );
}
 
export default Card;