import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactForm from "../ContactForm/ContactForm";

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            salad: 1,
            bacon: 1,
            cheese: 1
        },
        price: 0
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            if(param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients, price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <Fragment>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancelled={this.checkoutCancelledHandler}
                    continued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => {
                        return (
                            <ContactForm
                                {...props}
                                ingredients={this.state.ingredients}
                                price={this.state.price}
                            />
                        );
                    }}
                />
            </Fragment>
        );
    }
}

export default Checkout;
