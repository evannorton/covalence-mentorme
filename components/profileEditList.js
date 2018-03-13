import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Overlay, List, ListItem } from 'react-native-elements'

import { updateMe } from '../services/user';
import { logout } from '../services/user';

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
    async logout() {
        await logout();
        this.props.navigate('Home');
    }

    render() {
        return (
            <View style={{ zIndex: 1 }}>
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
                <View style={styles.buttonContainer}>
                    <View style={styles.logoutContainer}>
                        <TouchableOpacity onPress={() => { this.logout() }}>
                            <Image
                                style={styles.icon}
                                source={require('../images/exiticon.png')}
                            />
                        </TouchableOpacity>
                        <Text> Log Out </Text>
                 </View>
                    <View style={styles.editContainer}>
                        <TouchableOpacity onPress={() => { this.setState({ isEditListVisible: true }) }}>
                            <Image
                                style={styles.icon}
                                source={require('../images/editicon.png')}
                            />
                        </TouchableOpacity>
                        <Text>Edit</Text>
                    </View>
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

    buttonContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -50,
        

    },

    editContainer: {
        flex:1  ,
        width: 50,
        alignItems: 'center',
        top: 20,
        left: 50,
       
        
    },

    logoutContainer: {
        flex:1,
        width: 50,
        alignItems: 'center',
        top: 20,
        right: 50,
        
       
        
    },

    icon:{
        width: 50,
        height: 50,
       
    
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
    }



})