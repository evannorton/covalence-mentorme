import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

export default class ProfileCreditCard extends Component {

    renderCurrentCard() {
        console.log(this.props.me);
        if (this.props.me.card) {
            return (
                <Text>Current Card on file: XXXX-XXXX-XXXX-{this.props.me.card}</Text>
            );
        }
    }

    _onChange(form) {
        let number = form.values.number;
        if (number.length === 19) {
            console.log(number.substring(15));
            this.props.setCard(number.substring(15));
        }
    }

    render() {
        return (
            <View style={styles.creditCard}>
                {this.renderCurrentCard()}
                <LiteCreditCardInput onChange={(form) => { this._onChange(form) }} />
            </View>
        );
    }

}

const styles = StyleSheet.create({

    creditCard: {
        borderBottomWidth: 2,
        borderBottomColor: '#d3d3d3'
    }
})