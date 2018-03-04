import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';


export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    navigate(screen) {

        this.props.screenProps.navigation.navigate(screen);
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Search Screen</Text>
                <Button title='Select Subject' onPress={() => { this.navigate('MentorList') }} />
            </View>
        );
    }
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