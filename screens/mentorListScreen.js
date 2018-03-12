import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

import { getUser } from '../services/user';
import { getMentorSubjectsBySubject } from '../services/search';

export default class MentorListScreen extends Component {

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    constructor(props) {
        super(props);
        this.state = {
            mentorSubjects: [],
            mentor: {},
            index: 0
        }
    }

    async componentDidMount() {
        let mentorSubjects = await getMentorSubjectsBySubject(this.props.navigation.state.params.subjectid);
        let userid = mentorSubjects[this.state.index].userid;
        let mentor = await getUser(userid);
        console.log(mentor);
        this.setState({ mentorSubjects, mentor });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.mentor.name}</Text>
                <Text style={styles.text}>{this.state.mentor.email}</Text>
                <Text style={styles.text}>{this.state.mentor.phone}</Text>
                <Text style={styles.text}>{this.state.mentor.bio}</Text>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },

    text: {
        textAlign: 'center',
        fontWeight: 'bold'
    }

});