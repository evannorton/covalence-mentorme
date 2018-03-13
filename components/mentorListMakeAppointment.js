import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default class MentorListMakeAppointment extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => { this.props.renderOverlay() }} containerStyle={styles.buttonContainer} title="Make Appointment" />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center'
    },

    buttonContainer: {
        flex: 1
    }

});