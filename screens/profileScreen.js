import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { logout, getMe } from '../services/user';



export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {}
        }
    }

    static navigationOptions = {
        headerStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
        }
    };

    async componentDidMount() {
        let me = await getMe();
        this.setState({ me });
    }

    async logout() {
        await logout();
        this.props.screenProps.navigation.navigate('Home');
    }

    renderPhoto() {
        return (
            <View style={styles.imgContainer} >
                <Image
                    style={styles.image}
                    source={require('../images/profilephoto.jpg')}
                />
                <View style={styles.plusContainer}>
                    <Text style={styles.plus}>
                        +
                    </Text>

                </View>
            </View>
        )
    }

    renderLogout() {
        return (
            <View style={flex = 5}>
                <Button
                    text='log out'
                    onPress={() => { this.logout() }}
                />
            </View>
        );
    }

    render() {
        if (this.state.me.usertype === 'Mentor') {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Mentor Screen</Text>
                    {this.renderPhoto()}
                    {this.renderLogout()}
                </View>
            );

        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Student Screen</Text>
                    {this.renderPhoto()}
                    {this.renderLogout()}
                </View>
            )
        }
    };
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        backgroundColor: 'blue',
        flex: 1,
        flexDirection: 'column',

    },

    text: {
        textAlign: 'center'
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
    },



    imgContainer: {
        flex: 4,
        alignItems: 'center',

    }




});