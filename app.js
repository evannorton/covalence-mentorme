import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LandingScreen from './screens/landingScreen';
import LoginScreen from './screens/loginScreen';
import SignUpScreen from './screens/signUpScreen';
import MentorProfileScreen from './screens/mentorProfileScreen';
import StudentProfileScreen from './screens/studentProfileScreen';



const RootNavigator = StackNavigator({
    Home: { screen: LandingScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    MentorProfile: { screen: MentorProfileScreen },
    StudentProfile: { screen: StudentProfileScreen },

}, { intitialRouteName: 'Home' }
);


export default class App extends Component {
    render() {
        return (
            <RootNavigator />
        );
    }
}