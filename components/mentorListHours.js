import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class MentorListHours extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: []
        };
    }

    componentDidMount() {
        let start = this.props.start;
        let end = this.props.end;
        let hours = [];

        for (let i = start; i < end; i++) {
            if (i < 12) {
                hours.push(`${i}am`);
            } else if (i === 12) {
                hours.push(`${i}pm`);
            } else {
                hours.push(`${i - 12}pm`);
            }
        }
        //console.log(hours);
        this.setState({ hours });
    }

    render() {
        return (
            <View style={styles.hoursContainer}>
                {
                    this.state.hours.map((hour, key) => {
                        return (
                            <View style={styles.hour} key={key}>
                                <Text style={{ color: '#F8E191' }}>{hour}</Text>
                            </View>
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