import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import { getMe } from '../services/user';
import { CategoryServices, SubjectServices } from '../services/attribute';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {},
            categories: [],
            subjects: []
        }
    }

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    async componentDidMount() {
        let me = await getMe();
        let subjects = await SubjectServices.getSubjects();
        let categories = await CategoryServices.getCategories();
        this.setState({
            me,
            subjects,
            categories
        });
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                {
                    this.state.categories.map((category) => {
                        return (
                            <Accordion
                                key={category.id}
                                sections={[category.name]}
                                renderHeader={() => {
                                    return (
                                        <View style={styles.sectionContainer}>
                                            <View style={styles.section}>
                                                <Text key={category.id} >{category.name}</Text>
                                            </View>
                                        </View>

                                    );
                                }}
                                renderContent={() => {
                                    return (
                                        this.state.subjects.map((subject) => {
                                            if (subject.categoryid === category.id) {
                                                return (
                                                    <TouchableOpacity
                                                        key={subject.id}
                                                        onPress={() => {
                                                            this.props.screenProps.navigation.navigate('MentorList', { subjectid: subject.id });
                                                        }}>
                                                        <View style={styles.contentContainer}>
                                                            <View key={subject.id} style={styles.content} >
                                                                <Text>
                                                                    {subject.name}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>

                                                );
                                            }
                                        })
                                    );
                                }}
                            />
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 0,
    },

    sectionContainer: {
        flex: 0,
        flexDirection: 'row',
    },

    section: {
        backgroundColor: 'gold',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
    },

    content: {
        backgroundColor: 'blue',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
    },
    contentContainer: {
        flex: 0,
        flexDirection: 'row',
    }

});