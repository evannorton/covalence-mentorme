import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { getUser } from '../services/user';
import { SubjectServices, SkillServices } from '../services/attribute';
import { getMentorSubjectsBySubject } from '../services/search';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

// import photo
import ProfileName from '../components/profileName';
import ProfileWage from '../components/profileWage';
import ProfileBio from '../components/profileBio';
import MentorListSubjects from '../components/mentorListSubjects';
import MentorListSkills from '../components/mentorListSkills';

export default class MentorListScreen extends Component {

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    constructor(props) {
        super(props);
        this.state = {
            mentorSubjects: [],
            mentor: {},
            subjects: [],
            skills: [],
            index: 0
        }
    }

    async componentDidMount() {
        let mentorSubjects = await getMentorSubjectsBySubject(this.props.navigation.state.params.subjectid);
        let userid = mentorSubjects[this.state.index].userid;
        let mentor = await getUser(userid);
        let subjects = await SubjectServices.getMentorSubjects(userid);
        let skills = await SkillServices.getMentorSkills(userid);
        this.setState({ mentorSubjects, mentor, subjects, skills });
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
        let subjects = await SubjectServices.getMentorSubjects(userid);
        let skills = await SkillServices.getMentorSkills(userid);
        this.setState({ index, mentor, subjects, skills });
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
                <Image
                    style={styles.image}
                    source={{ uri: this.state.mentor.image }}
                />
                <ProfileName name={this.state.mentor.name} />
                <ProfileWage wage={this.state.mentor.wage} />
                <ProfileBio bio={this.state.mentor.bio} />
                <View style={styles.attributesContainer}>
                    <MentorListSubjects subjects={this.state.subjects} />
                    <MentorListSkills skills={this.state.skills} />
                </View>
            </GestureRecognizer>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    attributesContainer: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
    },

    image: {
        resizeMode: 'cover',
        width: 150,
        height: 150,
        borderRadius: 75
    },

    text: {
        textAlign: 'center',
        fontWeight: 'bold'
    }

});