import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {

    /* constructor(props){
        super(props);
        this.state={...}
    } */

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const prevIngredientCount = this.state.ingredients[type];                       // Previous number of ingredients per type.
        const updatedIngredientCount = prevIngredientCount + 1;                         // New number of ingredients per type.

        const updatedIngredients = {                                                    // State Update: Copy old state information into new array.
            ...this.state.ingredients                                                   // Spread operator
        };
        updatedIngredients[type] = updatedIngredientCount;                              // 
        const priceAddition = INGREDIENT_PRICES[type]                                   // Price to add.
        const prevPrice = this.state.totalPrice;                                        // Previous total price in state.
        const newPrice = prevPrice + priceAddition;                                     // New total price.

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });       // Finally, update the state with the new information.
    }

    removeIngredientHandler = (type) => {

    }

    render() {
        return (
            <Aux>
                <Burger
                    ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;