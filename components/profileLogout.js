import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { logout } from '../services/user';

export default class ProfileLogout extends Component {

    async logout() {
        await logout();
        this.props.navigate('Home');
    }

    render() {
        return (
            <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => { this.logout() }}>
                        <Image
                            style={styles.icon}
                            source={require('../images/exiticon.png')}
                        />
                    </TouchableOpacity>
                    <Text> Log Out </Text>
                </View>
          
        );
    }

}

const styles = StyleSheet.create({

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        paddingBottom: 5
    },

    icon: {
        resizeMode: 'cover',
        width: 50,
        height: 50,
    },

});