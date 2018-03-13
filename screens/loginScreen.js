import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';

import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';
import { login, getMe } from '../services/user';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.email;
        this.password;
        this.userType = this.props.navigation.state.params.userType;
    }

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    async login() {
        await login(this.email, this.password, this.userType);
        let res = await getMe();
        console.log(res);
        if (res) {
            this.navigate('Tab');
        }
    }

    navigate(screen, props) {
        this.props.navigation.navigate(screen, props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>{this.props.navigation.state.params.userType} Login
                </Text>

                <Input
                    onChangeText={(email) => { this.email = email.toLowerCase() }}
                    containerStyle={styles.input}
                    placeholder='EMAIL'
                    leftIcon={
                        <Icon
                            name='mail'
                            size={24}
                            color='black'
                            type='feather'
                        />
                    }

                />

                <Input
                    onChangeText={(password) => { this.password = password }}
                    containerStyle={styles.input}
                    placeholder='PASSWORD'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                            type='octicon'
                        />
                    }
                />

                <View style={styles.buttonsContainer}>
                    <Text style={styles.signup} onPress={() => { this.navigate('SignUp', { userType: this.props.navigation.state.params.userType }) }} >First time user?</Text>
                    <Button containerStyle={styles.signin} buttonStyle={styles.button} text='Sign In' onPress={() => { this.login(); }} />
                </View>

            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#465C62',
        justifyContent: 'center',
        alignItems: 'center'
    },

    message: {
        textAlign: 'center'
    },

    input: {
        borderColor: 'black',
        backgroundColor: '#A2D5E1',
        borderRadius: 70,
        borderWidth: 1,
        marginTop: 10
    },

    buttonsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    button: {
        borderColor: 'black',
        backgroundColor: '#465C62',
        borderRadius: 70,
        borderWidth: 1,
    },

    signup: {
        textAlign: 'center',
        flex: 1,
    },

    signin: {
        flex: 1,
        paddingBottom: 5,

    }

});