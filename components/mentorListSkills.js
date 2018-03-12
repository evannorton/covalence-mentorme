import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

export default class MentorListSkills extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text>Skills:</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    }
});