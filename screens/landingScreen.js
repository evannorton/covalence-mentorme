import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';



export default class LandingScreen extends Component {

    static navigationOptions = {
        headerStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
        }
    };

    render() {
        return (
            <View>
                <Text>MentorMe</Text>
            </View>
        )
    };
}