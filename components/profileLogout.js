import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { logout } from '../services/user';

export default class ProfileLogout extends Component {

    async logout() {
        await logout();
        this.props.screenProps.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.logout}>
                <Button buttonStyle={styles.button}
                    text='Logout'
                    onPress={() => { this.logout() }}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({

    logout: {
        flex: 0,
        borderColor: 'black',
        borderWidth: 2
    },

    button:{
        backgroundColor: 'rgb(135,204,236)',
        

    }

});