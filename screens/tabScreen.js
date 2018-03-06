import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import ProfileScreen from './profileScreen';
import FinanceScreen from './financeScreen';
import CalendarScreen from './calendarScreen';
import MessageScreen from './messageScreen';
import SearchScreen from './searchScreen';

import { getMe } from '../services/user';
import { DEFAULT_NAVIGATION_NO_ARROW } from '../services/navigation';

const MentorTabNavigation = TabNavigator({
    Profile: { screen: ProfileScreen },
    Finance: { screen: FinanceScreen },
    Calendar: { screen: CalendarScreen },
    Message: { screen: MessageScreen }
}, { tabBarPosition: 'bottom' });

const StudentTabNavigation = TabNavigator({
    Profile: { screen: ProfileScreen },
    Search: { screen: SearchScreen },
    Calendar: { screen: CalendarScreen },
    Message: { screen: MessageScreen }
}, { tabBarPosition: 'bottom' });


export default class TabScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {}
        }
    }

    static navigationOptions = DEFAULT_NAVIGATION_NO_ARROW;

    async componentDidMount() {
        let me = await getMe();
        this.setState({ me });
    }

    navigate(screen) {
        this.props.navigation.navigate(screen);
    }

    render() {
        if (this.state.me.usertype === 'Mentor') {
            return (
                <MentorTabNavigation navigate={this.props.navigation.navigate} screenProps={this.props} />
            );

        } else {
            return (
                <StudentTabNavigation navigate={this.props.navigation.navigate} screenProps={this.props} />
            )
        }
    };
}

