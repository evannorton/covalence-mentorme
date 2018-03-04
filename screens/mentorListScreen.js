import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';


export default class MentorListScreen extends Component {

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Mentor List</Text>

            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: 'blue',
        flex: 1,
        justifyContent: 'center'
    },

    text: {
        textAlign: 'center',
        fontWeight: 'bold'
    }

});