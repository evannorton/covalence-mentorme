import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LandingScreen from './screens/landingScreen';
import MentorLoginScreen from './screens/mentorLoginScreen';
import StudentLoginScreen from './screens/studentLoginScreen';

const RootNavigator = StackNavigator({
    Home: { screen: LandingScreen },
    MentorLogin: { screen: MentorLoginScreen },
    StudentLogin: { screen: StudentLoginScreen },

}, { intitialRouteName: 'Home' }
);


export default class App extends Component {
    render() {
        return (
            <RootNavigator />
        );
    }
}