import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'

export default class HeaderImage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require('../images/mentormeboldyellow2.png')} />
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        flex: 1,
        resizeMode: 'contain'
    }

});
