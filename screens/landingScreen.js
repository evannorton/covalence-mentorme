import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { TimerMixin } from 'react-timer-mixin';


import { DEFAULT_NAVIGATION_NO_ARROW } from '../services/navigation';

//temporary code for testing
import { login, getMe } from '../services/user';
//end temporary code

const wateringCan = require('../images/wateringcanicon.png');

const wateringCanWater = require('../images/wateringcaniconwater.png');

const seedling = require('../images/seedlingicon.png');

const seedlingLeaves = require('../images/seedlingiconleaves.png');



export default class LandingScreen extends Component {

    constructor() {
        super();
        this.state = { showWateringCan: true, showSeedling: true };

    }

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

    studentNavigate(userType) {
        setTimeout(() => {
            this.setState({ showSeedling: !this.state.showSeedlingLeaves });
            this.props.navigation.navigate('Login', { userType })
        }, 800);
    }

    mentorNavigate(userType) {
        setTimeout(() => {
            this.setState({ showWateringCan: !this.state.showWateringCan });
            this.props.navigation.navigate('Login', { userType })
        }, 800);
    }

    renderMentor() {
        let mentorSource = this.state.showWateringCan ?
            wateringCan : wateringCanWater;

        return (
            <Image
                style={styles.icon}
                source={mentorSource}
            />
        );
    }

    renderStudent() {
        let studentSource = this.state.showSeedling ?
            seedling : seedlingLeaves;

        return (
            <Image
                style={styles.icon}
                source={studentSource}
            />
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../images/mentormeboldwhite.png')} />
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ showWateringCan: !this.state.showWateringCan })
                            this.mentorNavigate('Mentor')
                        }}>
                        {this.renderMentor()}
                    </TouchableOpacity>

                    <Text> Mentor </Text>
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ showSeedling: !this.state.showSeedling })
                            this.studentNavigate('Student')
                        }}>
                        {this.renderStudent()}
                    </TouchableOpacity>
                    <Text> Student </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button text='TEST BUTTON' onPress={() => { this.testFunction() }} />
                </View>

            </View >
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'blue',
        paddingBottom: 0
    },

    image: {
        flex: 1,
        resizeMode: 'contain',

    },

    buttonContainer: {
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',

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
        resizeMode: 'contain',
        width: 150,
        height: 150,
        paddingBottom: 1


    },

})