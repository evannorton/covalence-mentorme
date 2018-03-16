import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Overlay, List, ListItem } from 'react-native-elements'

import { updateMe } from '../services/user';
import { logout } from '../services/user';

export default class ProfileEditList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            bio: ''
        }
    }
    async logout() {
        await logout();
        this.props.navigate('Home');
    }

    render() {
        return (
            <Overlay
                containerStyle={styles.overlayContainer}
                overlayStyle={styles.overlay}
                fullScreen={true}
                isVisible={this.props.visibility}
            >
                <List containerStyle={styles.list}>
                    <ListItem
                        containerStyle={styles.listItem}
                        textInputContainerStyle={styles.textContainer}
                        textInput={true}
                        textInputPlaceholder={this.props.me.name}
                        title="Name"
                        textInputMultiline={true}
                        textInputOnChangeText={(name) => { this.setState({ name }) }}
                    />
                    <ListItem
                        containerStyle={styles.listItem}
                        textInputContainerStyle={styles.textContainer}
                        titleContainerStyle={styles.title}
                        textInput={true}
                        textInputPlaceholder={this.props.me.email}
                        title="Email"
                        textInputMultiline={true}
                        textInputOnChangeText={(email) => { this.setState({ email: email.toLowerCase() }) }}
                    />
                    <ListItem
                        containerStyle={styles.listItem}
                        textInputContainerStyle={styles.textContainer}
                        textInput={true}
                        textInputPlaceholder={this.props.me.phone}
                        title="Phone"
                        textInputMultiline={true}
                        textInputOnChangeText={(phone) => { this.setState({ phone }) }}
                    />
                    <ListItem
                        containerStyle={styles.listItem}
                        textInputContainerStyle={styles.textContainerBio}
                        textInput={true}
                        textInputPlaceholder={this.props.me.bio}
                        title="Bio"
                        textInputMultiline={true}
                        textInputOnChangeText={(bio) => { this.setState({ bio }) }}
                    />
                </List>
                <Button
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.button}
                    text='Submit'
                    onPress={() => {
                        updateMe(this.props.me.id, {
                            name: this.state.name,
                            email: this.state.email,
                            phone: this.state.phone,
                            bio: this.state.bio
                        }).then(() => {
                            this.props.navigate('Tab');
                        });
                    }}
                />
                <Button
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.button}
                    text='Discard Changes'
                    onPress={() => {
                        this.props.navigate('Tab');
                    }}
                />
            </Overlay>

        );
    }
}

const styles = StyleSheet.create({

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
    },

    list: {
        marginBottom: 20,
        flex: 0
    },

    textContainer: {
        height: 40,
        flex: 2,

    },

    textContainerBio: {
        height: 120,
        paddingBottom: 0,
        flex: 2,

    },

    title: {
        width: 60,
        flex: 1
    },

    listItem: {
        flex: 0,
        flexDirection: 'column',
    },

    btnContainer: {
        paddingTop: 5,
        paddingBottom: 5
    },

    button: {
        backgroundColor: '#F4E19A'
    }

})