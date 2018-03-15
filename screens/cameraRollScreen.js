import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

import { postForm, BASE_URL } from '../services/rest';
import { DEFAULT_NAVIGATION_NO_ARROW } from '../services/navigation';

export default class CameraRollScreen extends Component {

    constructor(props) {
        super(props);
        this.userid = this.props.navigation.state.params.userid;
        this.navigation = this.props.navigation;
    }

    static navigationOptions = DEFAULT_NAVIGATION_NO_ARROW;

    getImage(images) {

        console.log(images);
        let userid = this.userid;
        let uri = images[0].uri;

        const data = new FormData();
        data.append('image', {
            uri,
            type: 'image/jpeg',
            name: 'profile'
        });
        fetch(`${BASE_URL}/api/users/images/${userid}`, {
            method: 'put',
            body: data
        }).then(() => {
            this.navigation.navigate('Tab');
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <CameraRollPicker
                callback={(images) => { this.getImage(images); }}
                maximum={1}
            />
        );
    }
}