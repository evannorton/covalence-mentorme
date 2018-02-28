import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button, Input as FormInput, Icon } from 'react-native-elements';



export default class SignUpScreen extends Component {

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
        this.props.navigation.navigate(screen);
    }

    render() {
        return (
            <View style={styles.container}>
                <FormInput
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

                <FormInput
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

                <FormInput
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
                    buttonStyle={styles.button}

                />


            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        justifyContent: 'center',
        margin: 0,
        alignItems: 'center'

    },

    text: {
        textAlign: 'center'
    },

    input: {
        borderColor: 'black',
        borderRadius: 70,
        borderWidth: 1,
        marginTop: 10
    },

    button: {
        borderColor: 'blue',
        backgroundColor: 'blue',
        borderRadius: 70,
        borderWidth: 1,
        marginTop: 10

    }


});