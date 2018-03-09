import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

export default class ProfileAttributeButtons extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => { this.props.renderSubjects() }}>
                        <Image
                            style={styles.icon}
                            source={require('../images/subjectsicon.png')}
                        />
                    </TouchableOpacity>
                    <Text> My Subjects </Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => { this.props.renderSkills() }}>
                        <Image
                            style={styles.icon}
                            source={require('../images/skillsicon.png')}
                        />
                    </TouchableOpacity>
                    <Text> My Skills </Text>
                </View >
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
    },

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        paddingBottom: 5
    },

    icon: {
        resizeMode: 'cover',
        width: 50,
        height: 50,
    },

});