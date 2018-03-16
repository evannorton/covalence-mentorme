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
<<<<<<< HEAD
        alignItems:'center'
=======
        alignItems: 'center'
>>>>>>> 4b3c388eb83d256e84c2cd9a5c46479bed8e24e2
    }

});