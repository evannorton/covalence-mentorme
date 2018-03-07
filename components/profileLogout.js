import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { logout } from '../services/user';

export default class ProfileLogout extends Component {

    async logout() {
        await logout();
        this.props.navigate('Home');
    }

    render() {
        return (
            <Button containerStyle={styles.buttonContainer} buttonStyle={styles.button}
                text='Logout'
                onPress={() => { this.logout() }}
            />
        );
    }

}

const styles = StyleSheet.create({

    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
        paddingBottom: 5
    },

    button: {
        width: 250,
        backgroundColor: 'rgb(95,72,47)',
    }

});