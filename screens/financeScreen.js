import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';
import { BASE_URL } from '../services/rest';
import { getMe, getCharges } from '../services/user';

export default class FinanceScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            charges: [],
            me: ''
        }
    }

    async componentDidMount() {
        try {
            let charges = await getCharges();
            console.log(charges);
        } catch (err) {
            console.log(err);
        }
    }

    static navigationOptions = {
        title: 'Finance',
        tabBarIcon: ({ tintColor }) => (tintColor == '#F8E191' ?
            <Image
                source={require('../images/financeicon.png')}
                style={{ width: 40, height: 40, }}
            />
            :
            <Image
                source={require('../images/financeicongray.png')}
                style={{ width: 40, height: 40, }}
            />

        ),


    }

    navigate(screen) {
        userType = this.props.navigation.state.params.userType;
        this.props.navigation.navigate(screen, { userType });
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Finance Screen</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: 'blue',
        flex: 1,
        justifyContent: 'center'
    },

    text: {
        textAlign: 'center'
    }

});