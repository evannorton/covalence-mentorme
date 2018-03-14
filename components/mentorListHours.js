import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

export default class MentorListHours extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: []
        };
    }

    componentDidMount() {
        let exceptionsString = this.props.exceptions;
        exceptionsString = exceptionsString.split('.');
        let exceptions = [];
        exceptionsString.forEach((exception) => {
            exceptions.push(parseInt(exception));
        });
        let start = this.props.start;
        let end = this.props.end;
        let hours = [];

        for (let i = start; i < end; i++) {
            let isException = false;
            for (let j = 0; j < exceptions.length; j++) {
                if (i === exceptions[j]) {
                    isException = true;
                }
            }
            if (isException) {
                if (i < 12) {
                    hours.push(`${i}am`);
                } else if (i === 12) {
                    hours.push(`${i}pm`);
                } else {
                    hours.push(`${i - 12}pm`);
                }
            }
        }
        this.setState({ hours });
    }

    render() {
        return (
            <View style={styles.hoursContainer}>
                {
                    this.state.hours.map((hour, key) => {
                        return (
                            <TouchableOpacity style={styles.hour} key={key} onPress={() => {

                                Alert.alert(
                                    'Appointment Requested!',
                                    `Your request for an appointment with ${this.props.mentor.name} at ${hour} on ${this.props.date} has been sent.`,
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => {
                                                this.props.navigate('Tab');
                                            }
                                        }
                                    ],
                                    { cancelable: false }
                                )
                            }}>
                                <Text style={{ color: '#F8E191' }}>{hour}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

    hoursContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },

    hour: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#465C62',
        borderWidth: 1,
        borderColor: 'black',
        height: 50,
        minWidth: 100
    }

});