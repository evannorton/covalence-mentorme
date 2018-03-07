import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProfileSubject extends Component {
    render() {
        return (

            <Text>
                {this.props.name}
            </Text>

        );
    }
}