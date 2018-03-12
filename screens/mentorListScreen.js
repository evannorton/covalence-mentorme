import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { getUser } from '../services/user';
import { getMentorSubjectsBySubject } from '../services/search';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';


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

    onSwipeUp(state) {
        return;
    }

    onSwipeDown(state) {
        return;
    }

    onSwipeLeft(state) {
        this.nextMentor();
    }

    onSwipeRight(state) {
        return;
    }

    onSwipe(gestureName, gestureState) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_RIGHT, SWIPE_LEFT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
                break;
            case SWIPE_DOWN:
                break;
            case SWIPE_LEFT:
                break;
            case SWIPE_RIGHT:
                break;
        }
    }

    async nextMentor() {
        let index = this.state.index + 1;
        let userid = this.state.mentorSubjects[index].userid;
        let mentor = await getUser(userid);
        this.setState({ index, mentor });
    }

    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                onSwipeUp={(state) => this.onSwipeUp(state)}
                onSwipeDown={(state) => this.onSwipeDown(state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={styles.container}
            >
                <Text style={styles.text}>{this.state.mentor.name}</Text>
                <Text style={styles.text}>{this.state.mentor.email}</Text>
                <Text style={styles.text}>{this.state.mentor.phone}</Text>
                <Text style={styles.text}>{this.state.mentor.bio}</Text>
            </GestureRecognizer>
        );

    }
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