import React from 'react';

import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)                    // This transforms teh ingredients object into an array.
        .map(ingredientName => {                                                // This is used to execute a function for each entry in the array.
            return (
                <li key={ingredientName}>
                    <span style={{ textTransform: 'capitalize' }}>{ingredientName}</span>:
                    {props.ingredients[ingredientName]}
                </li>
            )
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </Aux>
    );
};

export default orderSummary;