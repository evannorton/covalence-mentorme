import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';


export default class MessageScreen extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    navigate(screen) {
        userType = this.props.navigation.state.params.userType;
        this.props.navigation.navigate(screen, { userType });
    }

    render() {

        if (this.props.screenProps.userType === 'Mentor') {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Mentor Message Screen</Text>
                </View>
            );

        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Student Message Screen</Text>
                </View>
            )
        }
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
        textAlign: 'center'
    }

});