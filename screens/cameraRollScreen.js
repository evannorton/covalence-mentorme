import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

import { postForm } from '../services/rest';

export default class CameraRollScreen extends Component {

    constructor(props) {
        super(props);
        userid = this.props.navigation.state.params.userid;
    }

    static navigationOptions = {
        headerLeft: null,
        headerStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
        }
    };

    getImage(images) {

        let userid = this.userid;
        let uri = images[0].uri;

        const data = new FormData();
        data.append('image', {
            uri,
            type: 'image/jpeg',
            name: 'profile'
        });
        fetch(`https://en-mentorme.herokuapp.com/api/images/${userid}`, {
            method: 'post',
            body: data
        }).then((res) => {
            console.log(res);
        })
    }

    render() {
        return (
            <CameraRollPicker
                callback={this.getImage}
                maximum={1}
            />
        );
    }
}