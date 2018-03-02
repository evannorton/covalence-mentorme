import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { login, getMe } from '../services/user';



export default class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.email;
        this.password;
        this.userType = this.props.navigation.state.params.userType;
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

    async login() {
        await login(this.email, this.password, this.userType);
        let res = await getMe();
        if (res) {
            this.navigate('Tab');
        }
    }

    navigate(screen) {
        this.props.navigation.navigate(screen, { userType: this.props.navigation.state.params.userType });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Login Screen {this.props.navigation.state.params.userType}</Text>

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
                    <Text style={styles.signup} onPress={() => { this.navigate('SignUp') }} >Sign Up! </Text>
                    <Button containerStyle={styles.signin} buttonStyle={styles.button} text='Sign In' onPress={() => { this.login(); }} />
                </View>

            </View>

        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    message: {
        textAlign: 'center'
    },

    input: {
        borderColor: 'black',
        borderRadius: 70,
        borderWidth: 1,
        marginTop: 10
    },

    buttonsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    button: {
        borderColor: 'blue',
        backgroundColor: 'blue',
        borderRadius: 70,
        borderWidth: 1,
    },

    signup: {
        textAlign: 'center',
        flex: 1,
    },

    signin: {
        flex: 1,
    }

});