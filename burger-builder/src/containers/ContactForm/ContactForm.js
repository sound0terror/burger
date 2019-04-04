import React, {Component, Fragment} from 'react';

import axios from '../../axios-order';
import Button from "../../components/UI/Button/Button";
import './ContactForm.css';
import Spinner from "../../components/UI/Spinner/Spinner";

class ContactForm extends Component {
    state = {
        name: '',
        email: '',
        street: '',
        postal: '',
        loading: false
    };


    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                email: this.state.email,
                street: this.state.street,
                postal: this.state.postal
            }
        };

        axios.post('/orders.json', order).finally(() => {
            this.setState({loading: false});
            this.props.history.push('/');
        });
    };

    inputChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        let form;
        if (this.state.loading) {
            form = <Spinner/>
        } else {
            form = (
                <form onSubmit={this.orderHandler}>
                    <input
                        onChange={this.inputChangeHandler}
                        value={this.state.name}
                        className="Input"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                    />
                    <input
                        onChange={this.inputChangeHandler}
                        value={this.state.email}
                        className="Input"
                        type="email"
                        name="email"
                        placeholder="Your Mail"
                    />
                    <input
                        onChange={this.inputChangeHandler}
                        value={this.state.street}
                        className="Input"
                        type="text"
                        name="street"
                        placeholder="Street"
                    />
                    <input
                        onChange={this.inputChangeHandler}
                        value={this.state.postal}
                        className="Input"
                        type="text"
                        name="postal"
                        placeholder="Postal Code"/>
                    <Button type="Success">ORDER</Button>
                </form>
            );
        }

        return (
            <Fragment>
                <div className="ContactData">
                    <h4>Enter your Contact Data</h4>
                    {form}
                </div>
            </Fragment>
        )
    }
}

export default ContactForm;
