import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Overlay, Button, Input, Icon } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import { getMe, getMentorSkills, getMentorSubjects, getCategories, getSubjects, deleteMentorSubject, deleteMentorSkill, postSkill, postMentorSkill, getSkillByName } from '../services/user';
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
            isSkillsVisible: false
        }
        currentSkill = '';
    };

    static navigationOptions = {
        title: 'Profile',
        tabBarIcon:
            <Image
                source={require('../images/usericon.png')}
                style={{ width: 40, height: 40, }}
            />
    }

    async componentDidMount() {
        if (this.props.screenProps.navigation.state.params) {
            if (this.props.screenProps.navigation.state.params.isSubjectsVisible) {
                this.setState({ isSubjectsVisible: this.props.screenProps.navigation.state.params.isSubjectsVisible });
            } else if (this.props.screenProps.navigation.state.params.isSkillsVisible) {
                this.setState({ isSkillsVisible: this.props.screenProps.navigation.state.params.isSkillsVisible });
            }
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
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <Button onPress={() => { this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: false }); }} text='Back to Profile' />
                        <Text style={styles.overlayText}>My Subjects</Text>
                        <View style={styles.mySubjectsContainer}>
                            {
                                this.state.mySubjects.map((subject) => {
                                    return (
                                        <View style={styles.mySubjects}>
                                            <Text
                                                onPress={() => {
                                                    deleteMentorSubject(this.state.me.id, subject.id)
                                                        .then(() => {
                                                            this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: true });
                                                        });
                                                }}
                                                key={subject.id}>
                                                {subject.name}
                                            </Text>
                                        </View>
                                    );
                                })
                            }
                        </View>
                        <Text style={styles.overlayText}>Add Subjects</Text>
                        <View style={styles.accordian}>
                            {
                                this.state.categories.map((category) => {
                                    return (
                                        <Accordion
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
                        </View>
                    </ScrollView>
                </Overlay>
                <Overlay
                    containerStyle={styles.overlayContainer}
                    overlayStyle={styles.overlay}
                    fullScreen={true}
                    isVisible={this.state.isSkillsVisible}
                >
                    <Button onPress={() => { this.props.screenProps.navigation.navigate('Tab', { isSkillsVisible: false }); }} text='Back to Profile' />
                    <Input
                        onChangeText={(skill) => { this.currentSkill = skill }}
                        onSubmitEditing={() => {
                            getSkillByName(this.currentSkill)
                                .then((res) => {
                                    if (res.id) {
                                        postMentorSkill(this.state.me.id, res.id)
                                            .then(() => {
                                                this.props.screenProps.navigation.navigate('Tab', { isSkillsVisible: true });
                                            });
                                    } else {
                                        postSkill(this.currentSkill)
                                            .then((res) => {
                                                postMentorSkill(this.state.me.id, res.id)
                                                    .then(() => {
                                                        this.props.screenProps.navigation.navigate('Tab', { isSkillsVisible: true });
                                                    });
                                            }).catch((err) => {
                                                throw err;
                                                getSkillByName(this.currentSkill)
                                                    .then((id) => {
                                                        console.log(1);
                                                        console.log(id);
                                                    });
                                            });
                                    }
                                });
                        }}
                        placeholder='Add a skill'
                    />
                    <Text>My Skills</Text>
                    {
                        this.state.mySkills.map((skill) => {
                            return (
                                <Text
                                    key={skill.id}
                                    onPress={() => {
                                        deleteMentorSkill(this.state.me.id, skill.id)
                                            .then(() => {
                                                this.props.screenProps.navigation.navigate('Tab', { isSkillsVisible: true });
                                            });
                                    }}
                                >
                                    {skill.name}
                                </Text>
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
        margin: 0,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        borderColor: 'rgb(95,72,47)',
        borderWidth: 2,
        borderRadius: 100,
        paddingTop: 20
    },

    overlayContainer: {
        zIndex: 1,
        margin: -5,
        backgroundColor: 'rgba(255,255,255,0.75)',

    },

    overlay: {
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex: 1,
        flexDirection: 'column',
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
    sectionContainer: {
        flex: 0,
        flexDirection: 'row',
    },
    mySubjectsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mySubjects: {
        backgroundColor: 'gold',
        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
        margin: 2,
    },
    accordian: {
        flex: 2,
        

    },
    scrollView: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 120,
      

    },
    overlayText: {
        alignSelf: 'center',
    }




});