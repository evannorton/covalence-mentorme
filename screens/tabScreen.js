import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';

import ProfileScreen from './profileScreen';
import FinanceScreen from './financeScreen';
import CalendarScreen from './calendarScreen';
import MessageScreen from './messageScreen';
import SearchScreen from './searchScreen';
import HeaderImage from '../components/headerImage'

import { getMe } from '../services/user';

const MentorTabNavigation = TabNavigator({
    Profile: { screen: ProfileScreen },
    Finance: { screen: FinanceScreen },
    Calendar: { screen: CalendarScreen },
    Message: { screen: MessageScreen }
}, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            showIcon: true,
            iconStyle: {
                height: 40,
                width: 40
            },
            style: {
                backgroundColor: 'white',
                borderTopWidth: 0,
            }
        }
    });

const StudentTabNavigation = TabNavigator({
    Profile: { screen: ProfileScreen },
    Search: { screen: SearchScreen },
    Calendar: { screen: CalendarScreen },
    Message: { screen: MessageScreen }
}, {
        tabBarPosition: 'bottom',

    });


export default class TabScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {}
        }
    }

    static navigationOptions = {
        headerTitle: (
            <HeaderImage />
        ),
        headerLeft: null,
        headerStyle: {
            position: 'relative',
            backgroundColor: 'rgb(208,230,210)',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
        }
    }

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
                <View style={styles.container}>
                    <MentorTabNavigation screenProps={this.props} />
                </View>
            );

        } else {
            return (
                <View style={styles.container}>
                    <StudentTabNavigation screenProps={this.props} />
                </View>
            )
        }
    };
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        flex: 1,
    }

});