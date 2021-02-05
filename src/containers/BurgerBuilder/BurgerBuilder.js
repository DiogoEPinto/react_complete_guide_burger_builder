import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        /*  const ingredients = {
             ...this.state.ingredients                                                  // State Update: Copy old state information into new array.
         }; */

        const sum = Object.keys(ingredients)                                            // Returns an array of Strings with the ingredient names. [salad, bacon, etc]
            .map(ingredientName => {                                                    // This acts almost as a forEach loop.
                return ingredients[ingredientName];                                     // This returns the number associated with each ingredient name.
            })
            .reduce((sum, el) => {                                                      // We use this to calculate the sum of all the numbers. Starts at 0.
                return sum + el;
            }, 0);
        this.setState({ purchaseable: sum > 0 });                                       // Set purcahseable to true if there is at least one ingredient.
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
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {                                               // Same logic as the addIngredientHandler.
        const prevIngredientCount = this.state.ingredients[type];
        if (prevIngredientCount <= 0) {                                                 // Don't remove ingredients if they don't exist.
            return;
        }
        const updatedIngredientCount = prevIngredientCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngredientCount;
        const priceDeduction = INGREDIENT_PRICES[type]
        const prevPrice = this.state.totalPrice;
        const newPrice = prevPrice - priceDeduction;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {                                                           // Because we use setState we must declare  this as an arrow function.
        this.setState({ purchasing: true });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger
                    ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;