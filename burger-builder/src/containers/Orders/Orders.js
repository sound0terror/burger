import React, {Component} from 'react';
import axios from '../../axios-order';
import OrderItem from "../../components/Order/OrderItem/OrderItem";
import withErrorHandler from "../../HOC/withErrorHandler";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";


class Orders extends Component {
    state = {
        orders: {},
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            const orders = response.data;
            console.log(orders);
            this.setState({orders: orders || {}});
        }).catch((err) => {
            console.log(err);
            // throw new Error("Something went wrong with network request")
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    render() {
        return (
            <div>
                {
                    Object.keys(this.state.orders).map(orderId => {
                        const order = this.state.orders[orderId];
                        return (
                            <ErrorBoundary key={orderId}>
                                <OrderItem
                                    ingredients={order.ingredients}
                                    price={order.price}
                                    customer={order.customer}
                                />
                            </ErrorBoundary>
                        );
                    })
                }
            </div>
        );
    }
}

const newOrders = withErrorHandler(Orders, axios);
export default newOrders;
