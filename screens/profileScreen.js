import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { getMe, getMentorSkills, getMentorSubjects } from '../services/user';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

import ProfilePhoto from '../components/profilePhoto';
import ProfileName from '../components/profileName';
import ProfileWage from '../components/profileWage'; //mentor only
import ProfileBio from '../components/profileBio';
import ProfileContact from '../components/profileContact';
import ProfileLogout from '../components/profileLogout';

export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {},
            subjects: [],
            skills: []
        }
    };

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    async componentDidMount() {
        let me = await getMe();
        let subjects = await getMentorSubjects(me.id);
        let skills = await getMentorSkills(me.id);
        this.setState({
            me,
            subjects,
            skills
        });
    };

    renderWage() {
        if (this.state.me.usertype === 'Mentor') {
            return (
                <ProfileWage wage={this.state.me.wage} />
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ProfilePhoto />
                <ProfileName name={this.state.me.name} />
                {this.renderWage()}
                <ProfileBio bio={this.state.me.bio} />
                <ProfileContact email={this.state.me.email} phone={this.state.me.phone} />
                <ProfileLogout />
            </View>
        );
    };

}

const styles = StyleSheet.create({

    container: {
        paddingTop: 80,
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'column',
    }

});