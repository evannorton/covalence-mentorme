import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Overlay, List, ListItem } from 'react-native-elements'

import { updateMe } from '../services/user';

export default class ProfileEditList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditListVisible: false,
            name: '',
            email: '',
            phone: '',
            bio: ''
        }
    }

    render() {
        return (
            <View>
                <Overlay
                    containerStyle={styles.overlayContainer}
                    overlayStyle={styles.overlay}
                    fullScreen={true}
                    isVisible={this.state.isEditListVisible}
                >
                    <List containerStyle={styles.list}>
                        <ListItem
                            containerStyle={styles.listItem}
                            textInputContainerStyle={styles.textContainer}
                            textInput={true}
                            title="Name"
                            textInputMultiline={true}
                            textInputOnChangeText={(name) => { this.setState({ name }) }}
                        />
                        <ListItem
                            containerStyle={styles.listItem}
                            textInputContainerStyle={styles.textContainer}
                            textInput={true}
                            title="Email"
                            textInputMultiline={true}
                            textInputOnChangeText={(email) => { this.setState({ email: email.toLowerCase() }) }}
                        />
                        <ListItem
                            containerStyle={styles.listItem}
                            textInputContainerStyle={styles.textContainer}
                            textInput={true}
                            title="Phone"
                            textInputMultiline={true}
                            textInputOnChangeText={(phone) => { this.setState({ phone }) }}
                        />
                        <ListItem
                            containerStyle={styles.listItem}
                            textInputContainerStyle={styles.textContainerBio}
                            textInput={true}
                            title="Bio"
                            textInputMultiline={true}
                            textInputOnChangeText={(bio) => { this.setState({ bio }) }}
                        />
                    </List>
                    <Button
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
                        text='Discard Changes'
                        onPress={() => {
                            this.props.navigate('Tab');
                        }}
                    />
                </Overlay>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => { this.setState({ isEditListVisible: true }) }}>
                        <Image
                            style={styles.icon}
                            source={require('../images/editicon.png')}
                        />
                    </TouchableOpacity>
                    <Text>Edit</Text>
                </View>
            </View>
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

    listItem: {

    },

    iconContainer: {
        top: 19,
        alignSelf: 'flex-end',
        right: 50,
        marginBottom: -50,
        alignItems: 'center'
    },

    icon: {
        width: 50,
        height: 50,
    },

    textContainer: {
        height: 40,
        paddingBottom: 0
    },

    textContainerBio: {
        height: 120,
        paddingBottom: 0
    }

})