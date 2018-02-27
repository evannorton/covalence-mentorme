import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LandingScreen from './screens/landingScreen';
import LoginScreen from './screens/loginScreen';
import SignUpScreen from './screens/signUpScreen';
import TabScreen from './screens/tabScreen';
import MentorListScreen from './screens/mentorListScreen';



const RootNavigator = StackNavigator({
    Home: { screen: LandingScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    Tab: { screen: TabScreen },
    MentorList: { screen: MentorListScreen }

}, { intitialRouteName: 'Home' }
);


export default class App extends Component {
    render() {
        return (
            <RootNavigator />
        );
    }
}