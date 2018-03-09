import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Input, Overlay, Button } from 'react-native-elements';

import { deleteMentorSkill, postSkill, postMentorSkill, getSkillByName } from '../services/user';

export default class ProfileSkills extends Component {
    render() {
        return (
            <Overlay
                containerStyle={styles.overlayContainer}
                overlayStyle={styles.overlay}
                fullScreen={true}
                isVisible={this.props.isSkillsVisible}
            >
                <Button onPress={() => { this.props.screenProps.navigation.navigate('Tab', { isSkillsVisible: false }); }} text='Back to Profile' />
                <Input
                    onChangeText={(skill) => { this.currentSkill = skill }}
                    onSubmitEditing={() => {
                        getSkillByName(this.currentSkill)
                            .then((res) => {
                                if (res.id) {
                                    postMentorSkill(this.props.me.id, res.id)
                                        .then(() => {
                                            this.props.screenProps.navigation.navigate('Tab', { isSkillsVisible: true });
                                        });
                                } else {
                                    postSkill(this.currentSkill)
                                        .then((res) => {
                                            postMentorSkill(this.props.me.id, res.id)
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
                    this.props.mySkills.map((skill) => {
                        return (
                            <Text
                                key={skill.id}
                                onPress={() => {
                                    deleteMentorSkill(this.props.me.id, skill.id)
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
    },

});