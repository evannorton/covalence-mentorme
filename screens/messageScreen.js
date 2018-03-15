import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

import { getAppointments } from '../services/calendar';
import { SubjectServices } from '../services/attribute';
import { getMe, getUser } from '../services/user';

export default class MessageScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {},
            appointments: [],
            appointment: {
                user: {
                    name: ''
                },
                subject: {
                    name: ''
                },
                date: '',
                time: ''
            }
        }
    }

    static navigationOptions = {
        title: 'Requests',
        tabBarIcon: ({ tintColor }) => (tintColor == '#F8E191' ?
            <Image
                source={require('../images/messageicon.png')}
                style={{ width: 40, height: 40, }}
            />
            :
            <Image
                source={require('../images/messageicongray.png')}
                style={{ width: 40, height: 40, }}
            />

        ),
    }

    async componentDidMount() {
        let me = await getMe();
        let appointments = await getAppointments(me.usertype, me.id, 0);
        this.setState({ me, appointments });
    }

    async handleAppointment(appointment) {
        //user
        let user = {};
        if (this.state.me.usertype === 'Mentor') {
            user = await getUser(appointment.studentid);
        } else {
            user = await getUser(appointment.mentorid);
        }
        //date
        let date = appointment.date.substring(0, 10);
        //time
        let time = '';
        if (appointment.hour < 12) {
            time = `${appointment.hour}am`;
        } else if (appointment.hour === 12) {
            time = `${appointment.hour}pm`;
        } else {
            time = `${appointment.hour - 12}pm`;
        }
        //subject
        let subject = await SubjectServices.getSubject(appointment.subjectid);

        appointment = { user, date, time, subject };
        this.setState({ appointment });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {
                    this.state.appointments.map((appointment) => {
                        this.handleAppointment(appointment);
                        return (
                            <View style={styles.appointmentContainer}>
                                <Text>{this.state.appointment.user.name}</Text>
                                <Text>{this.state.appointment.subject.name}</Text>
                                <Text>{this.state.appointment.date}</Text>
                                <Text>{this.state.appointment.time}</Text>
                            </View>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    appointmentContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        flex: 0
    }

});