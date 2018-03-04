import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProfileWage extends Component {

    render() {
        return (
            <View style={styles.wageContainer}>
                <Text style={styles.wage}>
                    ${this.props.wage}/hour
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    wageContainer: {
        borderColor: 'black',
        borderWidth: 2,
        flex: 0,
    },

    wage: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }

});