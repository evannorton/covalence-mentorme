import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { logout } from '../services/user';

export default class ProfileButtonsTop extends Component {

    async logout() {
        await logout();
        this.props.navigate('Home');
    }
    
    render() {
        return (
            <View style={styles.buttonContainer}>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity onPress={() => { this.logout() }}>
                        <Image
                            style={styles.icon}
                            source={require('../images/exiticon.png')}
                        />
                    </TouchableOpacity>
                    <Text> Log Out </Text>
                </View>
                <View style={styles.editContainer}>
                    <TouchableOpacity onPress={() => { this.props.renderEditList() }}>
                        <Image
                            style={styles.icon}
                            source={require('../images/editicon.png')}
                        />
                    </TouchableOpacity>
                    <Text>Edit</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    buttonContainer: {
        zIndex: 1,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -50,


    },

    editContainer: {
        flex: 1,
        width: 50,
        alignItems: 'center',
        top: 20,
        left: 50,
    },

    logoutContainer: {
        flex: 1,
        width: 50,
        alignItems: 'center',
        top: 20,
        right: 50,
    },

    icon: {
        width: 50,
        height: 50,
    }

});