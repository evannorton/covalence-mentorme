import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

export default class MentorListAvailablities extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Overlay
                containerStyle={styles.overlayContainer}
                overlayStyle={styles.overlay}
                fullScreen={true}
                isVisible={this.props.visibility}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text></Text>
                </ScrollView>
            </Overlay>
        );
    }

}

const styles = StyleSheet.create({

    scrollView: {
        flexDirection: 'column',
        height: 2000,
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
    }

});