import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import ProfileScreen from './profileScreen';
import FinanceScreen from './financeScreen';
import CalendarScreen from './calendarScreen';
import MessageScreen from './messageScreen';
import SearchScreen from './searchScreen';


const MentorTabNavigation = TabNavigator({
    Profile: { screen: ProfileScreen },
    Finance: { screen: FinanceScreen },
    Calendar: { screen: CalendarScreen },
    Message: { screen: MessageScreen }
});

const StudentTabNavigation = TabNavigator({
    Profile: { screen: ProfileScreen },
    Search: { screen: SearchScreen },
    Calendar: { screen: CalendarScreen },
    Message: { screen: MessageScreen }
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
                <MentorTabNavigation screenProps={this.props} />
            );

        } else {
            return (
                <StudentTabNavigation screenProps={this.props} />
            )
        }
    };
}

