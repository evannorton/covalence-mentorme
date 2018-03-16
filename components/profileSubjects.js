import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import { SubjectServices } from '../services/attribute';

import ProfileSubject from '../components/profileSubject';

export default class ProfileSubjects extends Component {
    render() {
        return (
            <Overlay
                containerStyle={styles.overlayContainer}
                overlayStyle={styles.overlay}
                fullScreen={true}
                isVisible={this.props.isSubjectsVisible}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => { this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: false }) }}>
                            <Image
                                style={styles.icon}
                                source={require('../images/Back.png')}
                            />
                        </TouchableOpacity>
                        <Text> Back  </Text>
                    </View>
                    <Text style={styles.overlayText}>My Subjects</Text>
                    <Text style={styles.instruction}> Press Subject to Remove</Text>
                    <View style={styles.mySubjectsContainer}>
                        {
                            this.props.mySubjects.map((subject, key) => {
                                return (
                                    <View
                                        key={key}
                                        style={styles.mySubjects}>
                                        <Text
                                            style={styles.subjectText}
                                            onPress={() => {
                                                SubjectServices.deleteMentorSubject(this.props.me.id, subject.id)
                                                    .then(() => {
                                                        this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: true })
                                                    });
                                            }}
                                            key={subject.id}>
                                            {subject.name}
                                        </Text>
                                    </View>
                                );
                            })
                        }
                    </View>
                    <Text style={styles.overlayText}>Add Subjects</Text>
                    <View style={styles.accordian}>
                        {
                            this.props.categories.map((category) => {
                                return (
                                    <Accordion
                                        key={category.id}
                                        sections={[category.name]}
                                        renderHeader={() => {
                                            return (
                                                <View style={styles.sectionContainer}>
                                                    <View style={styles.section}>
                                                        <Text style={styles.categoryText} key={category.id} >{category.name}</Text>
                                                    </View>
                                                </View>

                                            );
                                        }}
                                        renderContent={() => {
                                            return (
                                                <ProfileSubject
                                                    refresh={() => { this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: true }) }}
                                                    userid={this.props.me.id}
                                                    subjects={this.props.subjects}
                                                    categoryid={category.id}
                                                />
                                            );
                                        }}
                                    />
                                );
                            })
                        }
                    </View>
                </ScrollView>
            </Overlay>
        );
    }
}

const styles = StyleSheet.create({

    scrollView: {
        flexDirection: 'column',
        height: 2000,
    },

    overlayContainer: {
        zIndex: 1,
        margin: 0,
        backgroundColor: 'rgba(255,255,255,0.75)',

    },

    overlay: {
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex: 1,
        flexDirection: 'column',
    },

    overlayText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },

    categoryText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    subjectText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
    },
    instruction: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    mySubjectsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mySubjects: {
        backgroundColor: '#F4E19A',
        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        height: 60,
        borderWidth: 2,
        borderColor: 'black',
        margin: 2,
    },

    sectionContainer: {
        flex: 0,
        flexDirection: 'row',

    },

    section: {
        backgroundColor: '#F4E19A',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 60,
        borderWidth: 2,
        borderColor: 'black',

    },

    accordian: {
        flex: 6,
    },
    icon: {
        height: 40,
        width: 40,
    },
    iconContainer: {
        alignItems: 'flex-end',
    }

});