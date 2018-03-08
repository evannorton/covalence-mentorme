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

    async testFunction() {
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
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../images/mentormeboldwhite.png')} />
                </View>

                <View style={styles.iconContainer}>
                    <Image
                        style={styles.icon}
                        source={require('../images/wateringcanicon.png')}
                    // onPress={() => { this.props.renderSkills() }
                    // }
                    />
                    <Text> Mentor </Text>

                    <Image
                        style={styles.icon}
                        source={require('../images/seedlingyoungicon.png')}
                    // onPress={() => { this.props.renderSkills() }
                    // }
                    />
                    <Text> Student </Text>
                </View>

                <Button text='TEST BUTTON' onPress={() => { this.testFunction() }} />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(208,230,210)',
        flex: 1
    },

    imageContainer: {
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        flex: 1,
        resizeMode: 'contain'
    },

    buttonsContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonContainer: {
        flex: 1,
        paddingBottom: 5
    },

    button: {
        borderColor: 'rgb(135,204,236)',
        backgroundColor: 'rgb(187,208,157)',
        borderRadius: 62,
        borderWidth: 1,
        height: 124,
        width: 124,
    },

    text: {
        color: 'rgb(95,72,47)'
    },

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        paddingBottom: 5
    },

    icon: {
        resizeMode: 'cover',
        width: 150,
        height: 150,
        marginTop: 100,


    },

})