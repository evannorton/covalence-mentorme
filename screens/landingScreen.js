import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

//temporary code for testing
import { login, getMe } from '../services/user';
//end temporary code

export default class LandingScreen extends Component {

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    //temporary code for testing

    async componentDidMount() {
        await login('admin', 'Admin', 'Mentor');
        let res = await getMe();
        if (res) {
            this.props.navigation.navigate('Tab');
        }
    }

    //end temporary code

    navigate(userType) {
        this.props.navigation.navigate('Login', { userType });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>MentorMe</Text>
                <Button text='Mentors' onPress={() => { this.navigate('Mentor') }} />
                <Button text='Students' onPress={() => { this.navigate('Student') }} />
            </View>
        );
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
        textAlign: 'center',
        fontWeight: 'bold'
    }

});