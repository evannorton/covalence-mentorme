import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProfileName extends Component {

    render() {
        return (
            <View style={styles.nameContainer}>
                <Text style={styles.name}>
                    {this.props.name}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    nameContainer: {
        flex: 0,
    },

    name: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30
    }

});