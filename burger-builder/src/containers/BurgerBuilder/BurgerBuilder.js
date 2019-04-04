import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 50,
    cheese: 200,
    meat: 500,
    bacon: 300
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            bacon: 0,
            salad: 0
        },
        totalPrice: 200,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);
        this.setState({purchasable: sum > 0});
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.updatePurchaseState(updatedIngredients);

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    };

    removeIngredientHandler = (type) => {
        console.log(type);
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) return;

        const newCount = oldCount - 1;

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.updatePurchaseState(updatedIngredients);

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    };

    purchaseHandler = () => {
        this.setState({purchasing: true, modalClass: 'open'});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false, modalClass: ''});
    };
    purchaseContinueHandler = () => {
        let queryParams = [];

        for (let key in this.state.ingredients) {
            if(this.state.ingredients.hasOwnProperty(key)) {
                queryParams.push(encodeURIComponent(key) + '=' +
                    encodeURIComponent(this.state.ingredients[key]));
            }
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    };


    render() {
        const disableInfo = {...this.state.ingredients};

        for (let key in disableInfo) {
            disableInfo[key] = (disableInfo[key] <= 0);
        }

        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    purchasable={this.state.purchasable}
                    disabled={disableInfo}
                    totalPrice={this.state.totalPrice}
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    ordered={this.purchaseHandler}
                />
                <Modal
                    show={this.state.purchasing}
                    closed={this.purchaseCancelHandler}
                >
                    <OrderSummary
                        continue={this.purchaseContinueHandler}
                        cancel={this.purchaseCancelHandler}
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                    />
                </Modal>
            </Fragment>
        );
    }
}

export default BurgerBuilder;
