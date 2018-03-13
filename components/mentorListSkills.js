import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

export default class MentorListSkills extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text>Skills:</Text>
                {
                    this.props.skills.map((skill) => {
                        return (
                            <Text key={skill.id}>{skill.name}</Text>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 0
    }
});