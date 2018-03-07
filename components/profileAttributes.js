import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class ProfileAttributeButtons extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <Button
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        textStyle={styles.text}
                        text='Subjects'
                        onPress={() => { this.props.renderSubjects() }}
                    />
                    <Button
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        textStyle={styles.text}
                        text='Skills'
                        onPress={() => { this.props.renderSkills() }}
                    />
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    buttonsContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },

    buttonContainer: {
        flex: 1,
        paddingBottom: 5
    },

    button: {
        width: 100
    },

    text: {

    }

});