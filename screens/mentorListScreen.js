import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { SubjectServices, SkillServices } from '../services/attribute';
import { getAvailability } from '../services/calendar';
import { getMentorSubjectsBySubject } from '../services/search';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

import MentorListAvailability from '../components/mentorListAvailability';
import MentorListSearch from '../components/mentorListSearch';
import ProfileName from '../components/profileName';
import ProfileWage from '../components/profileWage';
import ProfileBio from '../components/profileBio';
import MentorListSubjects from '../components/mentorListSubjects';
import MentorListSkills from '../components/mentorListSkills';
import MentorListMakeAppointment from '../components/mentorListMakeAppointment';

export default class MentorListScreen extends Component {

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    constructor(props) {
        super(props);
        this.state = {
            mentors: [],
            mentor: {},
            subjects: [],
            skills: [],
            availability: [],
            minWage: 0,
            maxWage: null,
            index: 0,
            maxIndex: '',
            skill1: '',
            skill2: '',
            skill3: '',
            refreshSearch: false,
            overlayVisibility: false
        }
        this.config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        }
    }

    async componentDidMount() {
        let mentors = await getMentorSubjectsBySubject(this.props.navigation.state.params.subjectid);
        let maxIndex = mentors.length - 1;
        this.setState({ mentors, maxIndex });
        this.setMentor(mentors[this.state.index], this.state.index);
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
        let availability = await getAvailability(mentor.id);
        let skill1 = this.state.skill1;
        let skill2 = this.state.skill2;
        let skill3 = this.state.skill3;
        let isSkill1 = !skill1;
        let isSkill2 = !skill2;
        let isSkill3 = !skill3;
        if (isSkill1) skill1 = '';
        if (isSkill2) skill2 = '';
        if (isSkill3) skill3 = '';
        skills.forEach((skill) => {
            if (skill.name.toLowerCase().indexOf(skill1.toLowerCase()) >= 0) {
                isSkill1 = true;
            }
            if (skill.name.toLowerCase().indexOf(skill2.toLowerCase()) >= 0) {
                isSkill2 = true;
            }
            if (skill.name.toLowerCase().indexOf(skill3.toLowerCase()) >= 0) {
                isSkill3 = true;
            }
        });
        if (!isSkill1 || !isSkill2 || !isSkill3) {
            this.setState({ index });
            this.nextMentor();
        } else {
            this.setState({ mentor, subjects, skills, availability, index });
        }
    }

    async nextMentor() {
        let index = this.state.index;
        let mentors = this.state.mentors;
        let isLessThanMin = false;
        let isMoreThanMax = false;
        let mentor = this.state.mentor;
        if (index < this.state.maxIndex) {
            do {
                index++;
                if (index <= this.state.maxIndex) {
                    mentor = mentors[index];
                    isLessThanMin = mentor.wage < this.state.minWage;
                    isMoreThanMax = mentor.wage > this.state.maxWage && this.state.maxWage !== null;
                }
            } while ((isLessThanMin || isMoreThanMax) && index <= this.state.maxIndex);
        } else {
            index++;
        }
        if (index > this.state.maxIndex) {
            Alert.alert(
                'No More Mentors',
                'You have swiped through all mentors which match your search criteria.',
                [
                    {
                        text: 'OK',
                        onPress: async () => {
                            await this.setState({
                                minWage: 0,
                                maxWage: null,
                                index: -1,
                                skill1: '',
                                skill2: '',
                                skill3: ''
                            });
                            this.setState({ refreshSearch: true });
                            this.setState({ refreshSearch: false });
                            this.nextMentor();
                        }
                    },
                ],
                { cancelable: false }
            )
        } else {
            this.setMentor(mentor, index);
        }
    }

    async previousMentor() {
        let index = this.state.index;
        let mentors = this.state.mentors;
        let isLessThanMin = false;
        let isMoreThanMax = false;
        let mentor = this.state.mentor;
        if (index > 0) {
            do {
                index--;
                mentor = mentors[index];
                isLessThanMin = mentors[index].wage < this.state.minWage;
                isMoreThanMax = mentors[index].wage > this.state.maxWage && this.state.maxWage !== null;
            } while ((isLessThanMin || isMoreThanMax) && index > 0);

        }
        this.setMentor(mentor, index);
    }

    async setWage(checked1, checked2, checked3) {
        let index = 0;
        let minWage = 0;
        let maxWage = null;
        if (checked3) {
            minWage = 30;
        } else if (checked2) {
            maxWage = 30;
        }
        if (checked2) {
            minWage = 15;
        } else if (checked1) {
            maxWage = 15;
        }
        if (checked1) {
            minWage = 0;
        } else if (checked3) {
            maxWage = null;
        }
        await this.setState({ minWage, maxWage, index: -1 });
        this.nextMentor();
    }

    async setSkills(skill1, skill2, skill3) {
        await this.setState({ skill1, skill2, skill3, index: -1 });
        this.nextMentor();
    }

    renderOverlay() {
        this.setState({ overlayVisibility: true });
    }

    render() {

        return (
            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                onSwipeUp={(state) => this.onSwipeUp(state)}
                onSwipeDown={(state) => this.onSwipeDown(state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={this.config}
                style={styles.container}
            >
                <MentorListAvailability
                    subjectid={this.props.navigation.state.params.subjectid}
                    navigate={this.props.navigation.navigate}
                    mentor={this.state.mentor}
                    availability={this.state.availability}
                    visibility={this.state.overlayVisibility}
                />
                <MentorListSearch
                    setWage={(checked1, checked2, checked3) => { this.setWage(checked1, checked2, checked3) }}
                    setSkills={(skill1, skill2, skill3) => { this.setSkills(skill1, skill2, skill3) }}
                    clearInputs={this.state.refreshSearch}
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
                <MentorListMakeAppointment renderOverlay={() => { this.renderOverlay() }} />
            </GestureRecognizer>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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