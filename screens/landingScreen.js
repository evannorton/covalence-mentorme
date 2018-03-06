import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

import { DEFAULT_NAVIGATION_NO_ARROW } from '../services/navigation';

//temporary code for testing
import { login, getMe } from '../services/user';
//end temporary code

export default class LandingScreen extends Component {

    static navigationOptions = DEFAULT_NAVIGATION_NO_ARROW;

    //temporary code for testing

    async componentDidMount() {
        await login('admin', 'Admin', 'Mentor');
        let res = await getMe();
        if (res) {
            this.props.navigation.navigate('Tab');
        }
    }

    //end temporary code

    navigate(userType) {
        this.props.navigation.navigate('Login', { userType });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require('../images/mentorme.jpeg')} />
                <View style={styles.buttonsContainer}>
                    <Button buttonStyle={styles.button} textStyle={styles.text} text='Mentors' onPress={() => { this.navigate('Mentor') }} />
                    <Button buttonStyle={styles.button} textStyle={styles.text} text='Students' onPress={() => { this.navigate('Student') }} />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'rgb(208,230,210)',
        flex: 1,

    },
    image: {
        resizeMode: 'center',
        width: 375,
        height: 200,

    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    button: {
        borderColor: 'rgb(135,204,236)',
        backgroundColor: 'rgb(135,204,236)',
        borderRadius: 75,
        borderWidth: 1,
        height: 125,
        width: 125,
        margin: 30,
    },
    text: {
        color: 'rgb(95,72,47)'
    }

})