import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';



export default class LandingScreen extends Component {

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
                <Text style={styles.text}>MentorMe</Text>
                <Button title='Mentors' onPress={() => { this.navigate('MentorLogin') }} />
                <Button title='Students' onPress={() => { this.navigate('StudentLogin') }} />
            </View>
        )
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