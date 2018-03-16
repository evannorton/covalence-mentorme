import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';
import { BASE_URL } from '../services/rest';
import { getMe, getCharges } from '../services/user';
import moment from 'moment';

// let moment = require('moment');

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

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
            console.log(charges.data);
            this.setState({ charges: charges.data });
        } catch (err) {
            console.log(err);
        }
    }

    static navigationOptions = {
        title: 'Payments',
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

    paymentsList() {
        return (
            this.state.transfers.map((data) => {
                return (
                    <View><Text>{data}</Text></View>
                )
            })
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View>
                        <Text style={styles.text}>Confirmed Payments</Text>
                    </View>
                    {
                        this.state.charges.map((data, index) => {
                            console.log(data);

                            return (
                                <View key={index}>
                                    <Text>{formatter.format(data.amount / 100)}</Text>
                                    <Text>{data.description}</Text>
                                    <Text>{moment().format("YYYY-MM-DD hh:mm:ss")}</Text>

                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: 'white',
        flex: 1,
    },

    text: {
        textAlign: 'center'
    }

});