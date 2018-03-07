import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import { getMe, getMentorSkills, getMentorSubjects, getCategories, getSubjects, deleteMentorSubject } from '../services/user';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

import ProfilePhoto from '../components/profilePhoto';
import ProfileName from '../components/profileName';
import ProfileWage from '../components/profileWage'; //mentor only
import ProfileBio from '../components/profileBio';
import ProfileContact from '../components/profileContact';
import ProfileAttributes from '../components/profileAttributes'; //mentor only
import ProfileSubject from '../components/profileSubject'; //mentor only
import ProfileLogout from '../components/profileLogout';

export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {},
            mySubjects: [],
            mySkills: [],
            subjects: [],
            categories: [],
            isSubjectsVisible: false,
            isSkillssVisible: false
        }
    };

    static navigationOptions = DEFAULT_NAVIGATION_OPTIONS;

    async componentDidMount() {
        if (this.props.screenProps.navigation.state.params) {
            this.setState({ isSubjectsVisible: this.props.screenProps.navigation.state.params.isSubjectsVisible });
        }
        let me = await getMe();
        let mySubjects = await getMentorSubjects(me.id);
        let mySkills = await getMentorSkills(me.id);
        let subjects = await getSubjects();
        let categories = await getCategories();
        mySubjects = mySubjects[0];
        mySkills = mySkills[0];
        this.setState({
            me,
            mySubjects,
            mySkills,
            subjects,
            categories
        });
    }

    renderSubjects() {
        this.setState({ isSubjectsVisible: true });
    }

    renderSkills() {
        this.setState({ isSkillsVisible: true });
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
                    renderSubjects={() => { this.renderSubjects() }}
                    renderSkills={() => { this.renderSkills() }}
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
                    <Button onPress={() => { this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: false }); }} text='Back to Profile' />
                    <Text>My Subjects</Text>
                    {
                        this.state.mySubjects.map((subject) => {
                            return (
                                <Text
                                    onPress={() => {
                                        deleteMentorSubject(this.state.me.id, subject.id)
                                        this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: true });
                                    }}
                                    key={subject.id}>{subject.name}
                                </Text>
                            );
                        })
                    }
                    <Text>Add Subjects</Text>
                    {
                        this.state.categories.map((category) => {
                            return (
                                <Accordion
                                    key={category.id}
                                    sections={[category.name]}
                                    renderHeader={() => {
                                        return (
                                            <Text>{category.name}</Text>
                                        );
                                    }}
                                    renderContent={() => {
                                        return (
                                            <ProfileSubject
                                                refresh={() => { this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: true }) }}
                                                userid={this.state.me.id}
                                                subjects={this.state.subjects}
                                                categoryid={category.id}
                                            />
                                        );
                                    }}
                                />
                            );
                        })
                    }
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