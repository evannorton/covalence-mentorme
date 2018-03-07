import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

import { getMe, getMentorSkills, getMentorSubjects } from '../services/user';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

import ProfileSubject from '../components/profileSubject';
import ProfilePhoto from '../components/profilePhoto';
import ProfileName from '../components/profileName';
import ProfileWage from '../components/profileWage'; //mentor only
import ProfileBio from '../components/profileBio';
import ProfileContact from '../components/profileContact';
import ProfileAttributes from '../components/profileAttributes'; //mentor only
import ProfileLogout from '../components/profileLogout';

export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {},
            subjects: [],
            skills: [],
            isSubjectsVisible: false,
            isSubjectsVisible: false
        }
    };

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    async componentDidMount() {
        let me = await getMe();
        let subjects = await getMentorSubjects(me.id);
        let skills = await getMentorSkills(me.id);
        subjects = subjects[0];
        skills = skills[0];
        console.log(subjects);
        this.setState({
            me,
            subjects,
            skills
        });
    }

    renderSubjects(isSubjectsVisible) {
        this.setState({ isSubjectsVisible });
    }

    renderSkills(isSkillsVisible) {
        this.setState({ isSkillsVisible })
    }

    renderWage() {
        if (this.state.me.usertype === 'Mentor') {
            return (
                <ProfileWage wage={this.state.me.wage} />
            );
        }
    }

    renderAttributes() {
        if (this.state.me.usertype === 'Mentor') {
            return (
                <ProfileAttributes
                    renderSubjects={(isSubjectsVisible) => { this.renderSubjects(isSubjectsVisible) }}
                    renderSkills={(isSkillsVisible) => { this.renderSkills(isSkillsVisible) }}
                />
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Overlay
                    containerStyle={styles.overlayContainer}
                    overlayStyle={styles.overlay}
                    fullScreen={true}
                    isVisible={this.state.isSubjectsVisible}
                >
                    {
                        this.state.subjects.map((subject) => {
                            return (
                                <ProfileSubject key={subject.id} name={subject.name} id={subject.id} />
                            );
                        })
                    }
                </Overlay>
                <Overlay isVisible={this.state.isSkillsVisible}>
                    <Text>Skills</Text>
                </Overlay>

                <ProfilePhoto userid={this.state.me.id} navigate={this.props.screenProps.navigation.navigate} />
                <ProfileName name={this.state.me.name} />
                {this.renderWage()}
                <ProfileBio bio={this.state.me.bio} />
                <ProfileContact email={this.state.me.email} phone={this.state.me.phone} />
                {this.renderAttributes()}
                <ProfileLogout navigate={this.props.screenProps.navigation.navigate} />

            </View>
        );
    };

}

const styles = StyleSheet.create({

    container: {
        margin: 20,
        backgroundColor: 'rgba(135,204,236,0.5)',
        flex: 1,
        flexDirection: 'column',
        borderColor: 'rgb(95,72,47)',
        borderWidth: 2,
        borderRadius: 100,
        paddingTop: 20
    },

    overlayContainer: {
        zIndex: 1,
        margin: -2,
        backgroundColor: 'rgba(255,255,255,0.75)'
    },

    overlay: {
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0.5)'
    }

});