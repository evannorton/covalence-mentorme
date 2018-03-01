import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { logout, getMe } from '../services/user';



export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
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

    async logout() {
        await logout();
        this.props.screenProps.navigation.navigate('Home');
    }

    renderLogout() {
        return (
            <Button
                text='log out'
                onPress={() => { this.logout() }}
            />
        );
    }

    render() {

        if (this.props.screenProps.navigation.state.params.userType === 'Mentor') {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Mentor Screen</Text>
                    {this.renderLogout()}
                </View>
            );

        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Student Screen</Text>
                    {this.renderLogout()}
                </View>
            )
        }
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: 'blue',
        flex: 1,
        justifyContent: 'center'
    },

    text: {
        textAlign: 'center'
    }

});