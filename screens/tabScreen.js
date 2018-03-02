import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import ProfileScreen from './profileScreen';
import FinanceScreen from './financeScreen';
import CalendarScreen from './calendarScreen';
import MessageScreen from './messageScreen';
import SearchScreen from './searchScreen';
import { getMe } from '../services/user';


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

    constructor(props) {
        super(props);
        this.state = {
            me: {}
        }
    }

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
                <MentorTabNavigation screenProps={this.props} />
            );

        } else {
            return (
                <StudentTabNavigation screenProps={this.props} />
            )
        }
    };
}

