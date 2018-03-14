import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Overlay } from 'react-native-elements';

export default class MentorListAvailablity extends Component {

    render() {
        return (
            <Overlay
                containerStyle={styles.overlayContainer}
                overlayStyle={styles.overlay}
                fullScreen={true}
                isVisible={this.props.visibility}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text>Availability</Text>
                    {
                        this.props.availability.map((availability) => {
                            return (
                                <Text key={availability.id}>
                                    {availability.date.substring(0, 10)} {availability.starttime}-{availability.endtime}
                                </Text>
                            );
                        })
                    }
                </ScrollView>
            </Overlay>
        );
    }

}

const styles = StyleSheet.create({

    scrollView: {
        zIndex: 100,
        flexDirection: 'column',
        height: 2000,
    },

    overlayContainer: {
        zIndex: 300,
        margin: -5,
        backgroundColor: 'rgba(255,255,255,0.75)',

    },

    overlay: {
        zIndex: 200,
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex: 1,
        flexDirection: 'column',
    }

});