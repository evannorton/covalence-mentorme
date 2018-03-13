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
            activeTintColor: '#F8E191',
            inactiveTintColor: 'gray',
            showIcon: true,
            iconStyle: {
                height: 40,
                width: 40,

            },
            style: {
                backgroundColor: '#465C62',
                borderTopWidth: 0,
                height: 70,

            },
            labelStyle: {
                fontSize: 15,
                fontWeight: 'bold',

            },
        }
    });

const StudentTabNavigation = TabNavigator({
    Profile: { screen: ProfileScreen },
    Search: { screen: SearchScreen },
    Calendar: { screen: CalendarScreen },
    Message: { screen: MessageScreen }
}, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#F8E191',
            inactiveTintColor: 'gray',
            showIcon: true,
            iconStyle: {
                height: 40,
                width: 40,

            },
            style: {
                backgroundColor: '#465C62',
                borderTopWidth: 0,
                height: 70,

            },

            labelStyle: {
                fontSize: 15,
                fontWeight: 'bold',
            },
        }
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
            backgroundColor: '#405E63',
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