//messagescreen


import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

import { getAppointments, confirmAppointment, deleteAppointment, getAvailability, addException, removeException } from '../services/calendar';
import { SubjectServices } from '../services/attribute';
import { makePayment } from '../services/stripe';
import { getMe, getUser } from '../services/user';

export default class MessageScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {},
            appointments: []
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
        this.setState({ me });
        let appointments = await getAppointments(me.usertype, me.id, 0);

        for (let i = 0; i < appointments.length; i++) {
            let appointment = appointments[i];
            let appt = await this.handleAppointment(appointment);

            appointment.user = appt.user;
            appointment.date = appt.date;
            appointment.time = appt.time;
            appointment.subject = appt.subject;
        }

        this.setState({ appointments });
    }

    async handleAppointment(appointment) {
        //user
        let user = {};
        console.log(this.state.me.usertype);
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

        return { user, date, time, subject };
    }

    renderConfirm(appointment) {
        if (this.state.me.usertype === 'Mentor') {
            return (
                <TouchableOpacity
                    onPress={async () => {
                        await confirmAppointment(appointment.id);
                        makePayment(this.state.me.id, appointment.user.id, this.state.me.wage * 100);
                        let appointments = await getAppointments(this.state.me.usertype, this.state.me.id, 0);
                        for (let i = 0; i < appointments.length; i++) {
                            let appointment = appointments[i];
                            let appt = await this.handleAppointment(appointment);

                            appointment.user = appt.user;
                            appointment.date = appt.date;
                            appointment.time = appt.time;
                            appointment.subject = appt.subject;
                        }

                        this.setState({ appointments });
                    }}
                    style={styles.iconContainer}
                >
                    <Image style={styles.icon} source={require('../images/success.png')} />
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                        Requests
                    </Text>
                </View>
                {
                    this.state.appointments.map((appointment) => {
                        return (
                            <View key={appointment.id} style={styles.appointmentContainer}>
                                <View style={styles.textContainer}>
                                    <Text>{appointment.user.name}</Text>
                                    <Text>{appointment.subject.name}</Text>
                                    <Text>{appointment.date}</Text>
                                    <Text>{appointment.time}</Text>
                                </View>
                                {this.renderConfirm(appointment)}
                                <TouchableOpacity
                                    onPress={async () => {
                                        //delete appointment
                                        await deleteAppointment(appointment.id);
                                        //delete exception from availabilities
                                        let availability = [];
                                        if (this.state.me.usertype === 'Mentor') {
                                            availability = await getAvailability(this.state.me.id);
                                        } else {
                                            availability = await getAvailability(appointment.user.id);
                                        }
                                        console.log(availability);
                                        let singleAvailability = {};
                                        for (let i = 0; i < availability.length; i++) {
                                            console.log(availability[i].date.substring(0, 10));
                                            console.log(appointment.date);
                                            if (availability[i].date.substring(0, 10) === appointment.date) {
                                                console.log('hi');
                                                singleAvailability = availability[i];
                                            }
                                        }
                                        console.log(singleAvailability);
                                        removeException(singleAvailability.id, singleAvailability.exceptions, appointment.time);
                                        //reload page with new appointments
                                        let appointments = await getAppointments(this.state.me.usertype, this.state.me.id, 0);
                                        for (let i = 0; i < appointments.length; i++) {
                                            let appointment = appointments[i];

                                            let appt = await this.handleAppointment(appointment);

                                            appointment.user = appt.user;
                                            appointment.date = appt.date;
                                            appointment.time = appt.time;
                                            appointment.subject = appt.subject;
                                        }
                                        this.setState({ appointments });
                                    }}
                                    style={styles.iconContainer}
                                >
                                    <Image style={styles.icon} source={require('../images/error.png')} />
                                </TouchableOpacity>
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
        flex: 1,
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30
    },

    appointmentContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 30,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        flex: 0,
        flexDirection: 'row',
        backgroundColor: '#F8E191'
    },

    textContainer: {
        flex: 1,
        alignItems: 'center'
    },


    iconContainer: {
        flex: 1,
        marginRight: -30,
        alignItems: 'center',
    },

    icon: {
        width: 60,
        height: 60
    }

});