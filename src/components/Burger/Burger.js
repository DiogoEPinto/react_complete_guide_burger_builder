import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    // This basicaly does the following: It takes our array of ingredientes. Cycles through each Ingredient, and for each one it gets it's numeric value.
    // Then after receiving the numeric value it creates a new BurgerIngredient, based on the Name and Value it extracted.
    // 
    const transformedIngredients = Object.keys(props.ingredients)       // Extracts keys from a object and turns it into an array. So it returns ['salad', 'bacon', 'cheese', 'meat'].                      
        .map(ingredientName => {                                        // Map creates a new array. We execute a function for each ingredient.                        
            return [...Array(props.ingredients[ingredientName])].map((_, i) => {    
                return <BurgerIngredient key={ingredientName + i} type={ingredientName} />;
            });
        });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;