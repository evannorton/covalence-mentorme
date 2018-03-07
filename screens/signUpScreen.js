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
        await signup(this.name, this.email.toLowerCase(), this.password, this.userType);
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

                <Button
                    text='submit'
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    onPress={() => {
                        this.signup();
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
        backgroundColor: 'rgb(208,230,210)',

    },

    input: {
        borderColor: 'black',
        borderRadius: 70,
        borderWidth: 1,
        marginTop: 10
    },

    buttonContainer: {
        paddingBottom: 5
    },

    button: {
        borderColor: 'rgb(135,204,236)',
        backgroundColor: 'rgb(135,204,236)',
        borderRadius: 70,
        borderWidth: 1,
        marginTop: 10

    }

});