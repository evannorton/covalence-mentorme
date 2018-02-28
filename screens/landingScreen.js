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

    navigate(userType) {
        this.props.navigation.navigate('Login', { userType });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Mentor.Me</Text>
                <Button text='Mentors' onPress={() => { this.navigate('Mentor') }} />
                <Button text='Students' onPress={() => { this.navigate('Student') }} />
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