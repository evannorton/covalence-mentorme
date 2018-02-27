import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LandingScreen from './screens/landingScreen';

const RootNavigator = StackNavigator({
    Home: { screen: LandingScreen },
}, { intitialRouteName: 'Home' }
);


export default class App extends Component {
    render() {
        return (
            <RootNavigator />
        );
    }
}