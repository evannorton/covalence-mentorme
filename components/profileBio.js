import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProfileBio extends Component {

    render() {
        return (
            <View style={styles.bio}>
                <Text>
                    {this.props.bio}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    bio: {
        flex: 0,
        paddingLeft: 20,
        paddingRight: 20,
    }

});