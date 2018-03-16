import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Input, Overlay, Button } from 'react-native-elements';

import { SkillServices } from '../services/attribute';

export default class ProfileSkills extends Component {
    render() {
        return (
            <Overlay
                containerStyle={styles.overlayContainer}
                overlayStyle={styles.overlay}
                fullScreen={true}
                isVisible={this.props.isSkillsVisible}
            >
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => { this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: false }) }}>
                        <Image
                            style={styles.icon}
                            source={require('../images/Back.png')}
                        />
                    </TouchableOpacity>
                    <Text> Back  </Text>
                </View>
                <View style={styles.skillContainer}>
                    <View style={styles.inputContainer}>
                        <Input
                            onChangeText={(skill) => { this.currentSkill = skill }}
                            onSubmitEditing={() => {
                                SkillServices.getSkillByName(this.currentSkill)
                                    .then((res) => {
                                        if (res.id) {
                                            SkillServices.postMentorSkill(this.props.me.id, res.id)
                                                .then(() => {
                                                    this.props.screenProps.navigation.navigate('Tab', { isSkillsVisible: true });
                                                });
                                        } else {
                                            SkillServices.postSkill(this.currentSkill)
                                                .then((res) => {
                                                    SkillServices.postMentorSkill(this.props.me.id, res.id)
                                                        .then(() => {
                                                            this.props.screenProps.navigation.navigate('Tab', { isSkillsVisible: true });
                                                        });
                                                }).catch((err) => {
                                                    throw err;
                                                    SkillServices.getSkillByName(this.currentSkill)
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
                    </View>
                    <Text style={styles.overlayText}>My Skills</Text>
                    <Text style={styles.instruction}>Press on Skills to Remove</Text>
                    <View style={styles.mySkillsContainer}>
                        {
                            this.props.mySkills.map((skill, key) => {
                                return (
                                    <View
                                        key={key}
                                        style={styles.mySkills}>
                                        <Text 
                                        style={styles.mySkillsText}
                                            key={skill.id}
                                            onPress={() => {
                                                SkillServices.deleteMentorSkill(this.props.me.id, skill.id)
                                                    .then(() => {
                                                        this.props.screenProps.navigation.navigate('Tab', { isSkillsVisible: true });
                                                    });
                                            }}
                                        >
                                            {skill.name}
                                        </Text>
                                    </View>
                                );
                            })
                        }
                    </View>

                </View>
            </Overlay >
        );
    }
}

const styles = StyleSheet.create({

    scrollView: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 120,
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

    overlayText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    instruction:{
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    mySkillsText:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    icon: {
        height: 40,
        width: 40,
    },
    iconContainer: {
        alignItems: 'flex-end',
    },
    skillContainer: {
        alignItems: 'center',
        
        flex: 1,
    },
    inputContainer:{
        flex:1,

    },

    mySkillsContainer: {
        flex: 7,
        flexDirection: 'row',
        flexWrap: 'wrap',
       
        justifyContent: 'flex-start'

    },

    mySkills: {
        backgroundColor: '#F8E191',
        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        height: 60,
        borderWidth: 1,
        borderColor: 'black',
        margin: 2,
    },

});