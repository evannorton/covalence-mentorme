import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
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

    static navigationOptions = {
        title: 'Search',
        tabBarIcon: ({ tintColor }) => (tintColor == '#F8E191' ?
            <Image
                source={require('../images/searchicon.png')}
                style={{ width: 40, height: 40, }}
            />
            :
            <Image
                source={require('../images/searchicongray.png')}
                style={{ width: 40, height: 40, }}
            />

        ),
    }


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
                                                <Text key={category.id} style={styles.text}>{category.name}</Text>
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
                                                                <Text style={styles.subjectText}  >
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
        backgroundColor: 'white',
        margin: 10,

    },

    sectionContainer: {
        flex: 0,
        flexDirection: 'row',

    },

    section: {
        backgroundColor: '#F8E191',
        alignSelf: 'center',
        alignItems: 'center',
        flex: 1,
        height: 60,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
    },

    content: {
        backgroundColor: '#465C62',
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
        paddingLeft: 40,
        paddingRight: 40,

    },

    text: {
        fontWeight: 'bold',
        fontSize: 20
    },

    subjectText: {
        color: '#F4E19A',
        fontSize: 20,
    },

});