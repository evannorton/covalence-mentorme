import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';

export default class ProfileAttributeButtons extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Image
                        style={styles.icon}
                        source={require('../images/subjectsicon.png')}
                        onPress={() => { this.props.renderSubjects() }
                        }
                    />
                    <Text> My Subjects </Text>

                </View>
                <View style={styles.iconContainer}>
                    <Image
                        style={styles.icon}
                        source={require('../images/skillsicon.png')}
                        onPress={() => { this.props.renderSkills() }
                        }
                    />
                    <Text> My Skills </Text>
                </View>
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