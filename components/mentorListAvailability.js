import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import MentorListHours from './mentorListHours';

export default class MentorListAvailablity extends Component {

    render() {
        return (
            <Overlay
                containerStyle={styles.overlayContainer}
                overlayStyle={styles.overlay}
                fullScreen={true}
                isVisible={this.props.visibility}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text>{this.props.mentor.name}'s Availability</Text>

                    {
                        this.props.availability.map((availability) => {
                            return (
                                <Accordion
                                    key={availability.id}
                                    sections={[availability.date.substring(0, 10)]}
                                    renderHeader={() => {
                                        return (
                                            <View style={styles.availabilityContainer}>
                                                <Text style={{ fontSize: 40 }}>
                                                    {availability.date.substring(0, 10)}
                                                </Text>
                                            </View>

                                        );
                                    }}
                                    renderContent={() => {
                                        return (
                                            <MentorListHours
                                                subjectid={this.props.subjectid}
                                                id={availability.id}
                                                navigate={this.props.navigate}
                                                mentor={this.props.mentor}
                                                date={availability.date.substring(0, 10)}
                                                exceptions={availability.exceptions}
                                                start={availability.starttime}
                                                end={availability.endtime}
                                            />
                                        );
                                    }}
                                />
                            );
                        })
                    }
                </ScrollView>
            </Overlay>
        );
    }

}

const styles = StyleSheet.create({

    scrollView: {
        zIndex: 100,
        height: 2000,
        alignItems: 'center'
    },

    overlayContainer: {
        paddingTop: 50,
        zIndex: 300,
        margin: -5,
        backgroundColor: 'rgba(255,255,255,0.75)',
    },

    overlay: {
        zIndex: 200,
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex: 1,
    },

    availabilityContainer: {
        alignSelf: 'center',
        backgroundColor: '#F8E191',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 60,
        borderWidth: 1,
        borderColor: 'black',
        margin: 2,
    }

});