import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';



export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

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

    navigate(screen) {
        this.props.navigation.navigate(screen, { userType: this.props.navigation.state.params.userType });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Login Screen {this.props.navigation.state.params.userType}</Text>
                <Button title='Sign Up' onPress={() => { this.navigate('SignUp') }} />
                <Button title='Sign In' onPress={() => { this.navigate('Tab') }} />

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
        textAlign: 'center'
    }

});