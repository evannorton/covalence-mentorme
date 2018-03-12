import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { SubjectServices, SkillServices } from '../services/attribute';
import { getMentorSubjectsBySubject } from '../services/search';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

import MentorListSearch from '../components/mentorListSearch';
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
            mentors: [],
            mentor: {},
            subjects: [],
            skills: [],
            minWage: 0,
            maxWage: null,
            index: 0
        }
    }

    async componentDidMount() {
        let mentors = await getMentorSubjectsBySubject(this.props.navigation.state.params.subjectid);
        this.setState({ mentors });
        this.setMentor(mentors[this.state.index], this.state.index);
    }

    log(mentors) {
        console.log(mentors[0]);
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
        this.previousMentor();
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

    async setMentor(mentor, index) {
        let subjects = await SubjectServices.getMentorSubjects(mentor.id);
        let skills = await SkillServices.getMentorSkills(mentor.id);
        this.setState({ mentor, subjects, skills, index });
    }

    async nextMentor() {
        let index = this.state.index;
        let mentors = this.state.mentors;
        let mentor;
        do {
            index++;
            console.log(index);
            mentor = mentors[index];
        } while (mentors[index].wage < this.state.minWage || (mentors[index].wage > this.state.maxWage && this.state.maxWage !== null))
        this.setMentor(mentor, index);
    }

    async previousMentor() {
        let index = this.state.index;
        let mentors = this.state.mentors;
        let mentor;
        do {
            index--;
            console.log(index);
            mentor = mentors[index];
        } while (mentors[index].wage < this.state.minWage || (mentors[index].wage > this.state.maxWage && this.state.maxWage !== null))
        this.setMentor(mentor, index);
    }

    setWage() {

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
                <MentorListSearch
                    setWage={() => { this.setWage() }}
                />
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