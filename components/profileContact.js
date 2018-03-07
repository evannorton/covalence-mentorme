import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProfileContact extends Component {

    render() {
        return (
            <View style={styles.contactContainer}>
                <Text style={styles.contact}>
                    email: {this.props.email}
                </Text>
                <Text style={styles.contact}>
                    phone: {this.props.phone}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    contactContainer: {
        flex: 0,
    },

    contact: {
        textAlign: 'center',
        fontWeight: 'bold',
    }

});