import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

export default class MentorListSubjects extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text>Subjects:</Text>
                {
                    this.props.subjects.map((subject) => {
                        return (
                            <Text key={subject.id}>{subject.name}</Text>
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
        flex: 1
    }
});