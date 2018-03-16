import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';

import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';
import { signup } from '../services/user';

export default class SignUpScreen extends Component {

    constructor(props) {
        super(props);
        this.name;
        this.email;
        this.password;
        this.userType = this.props.navigation.state.params.userType;
    }

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    async signup() {
        try {
            await signup(this.name, this.email.toLowerCase(), this.password, this.userType);
        } catch (e) {
            console.log(e);
        }
    }
    goBack(){
        this.props.navigation.goBack();
    }

    navigate(screen) {
        this.props.navigation.navigate(screen);
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    onChangeText={(name) => { this.name = name }}
                    containerStyle={styles.input}
                    placeholder='FULL NAME'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                            type='simple-line-icon'
                        />
                    }
                />

                <Input
                    onChangeText={(email) => { this.email = email }}
                    containerStyle={styles.input}
                    placeholder='EMAIL'
                    keyboardType='email-address'
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
                    secureTextEntry={true}
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

                <Button
                    text='submit'
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    onPress={() => {
                        this.signup();
                        this.goBack();

                    }}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        justifyContent: 'center',
        margin: 0,
        alignItems: 'center',
        backgroundColor: '#405E63',

    },

    input: {
        borderColor: 'black',
        borderRadius: 70,
        borderWidth: 1,
        marginTop: 10,
        backgroundColor: '#A2D5E1',
    },

    buttonContainer: {
        paddingBottom: 5
    },

    button: {
        borderColor: 'black',
        backgroundColor: '#465C62',
        borderRadius: 70,
        borderWidth: 1,
        marginTop: 10,

    }

});