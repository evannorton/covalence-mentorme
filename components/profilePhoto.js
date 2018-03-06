import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default class ProfilePhoto extends Component {

    render() {
        return (
            <View style={styles.Container} >
                <Image
                    style={styles.image}
                    source={require('../images/profilephoto.jpg')}
                />
                <View style={styles.plusContainer}>
                    <Text style={styles.plus} onPress={() => {
                        this.props.navigate('CameraRoll', { userid: this.props.userid, navigate: this.props.navigate })
                    }}>
                        +
                    </Text>
                </View>
            </View >
        );
    }

}

const styles = StyleSheet.create({

    Container: {
        flex: 0,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
    },

    image: {
        resizeMode: 'cover',
        width: 150,
        height: 150,
        borderRadius: 75
    },

    plusContainer: {
        width: 30,
        height: 30,
        backgroundColor: 'rgba(255,254,226,0.7)',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        bottom: 33,
        left: 50,
        justifyContent: 'center',
    },

    plus: {
        textAlign: 'center',
        fontSize: 40,
        bottom: 3
    }

});