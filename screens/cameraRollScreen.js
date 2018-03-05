import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

import { post } from '../services/rest';

export default class CameraRollScreen extends Component {

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
        let uri = images[0].uri;
        const data = new FormData();

        /*
        data.append('name', 'testName'); // you can append anyone.
        data.append('image', {
            uri: image.uri,
            type: 'image/jpeg', // or photo.type
            name: 'testPhotoName'
        });
        fetch(url, {
            method: 'post',
            body: data
        }).then(res => {
            console.log(res)
        });
        post('/api/images', )
        */

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