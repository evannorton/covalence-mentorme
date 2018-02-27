import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import ProfileScreen from './profileScreen';


const MentorTabNavigation = TabNavigator({
    Profile: { screen: ProfileScreen }
});

const StudentTabNavigation = TabNavigator({
    Profile: { screen: ProfileScreen }
});


export default class TabScreen extends Component {

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
        if (this.props.navigation.state.params.userType === 'Mentor') {
            return (
                <MentorTabNavigation screenProps={this.props.navigation.state.params} />
            );

        } else {
            return (
                <StudentTabNavigation screenProps={this.props.navigation.state.params} />
            )
        }
    };
}

