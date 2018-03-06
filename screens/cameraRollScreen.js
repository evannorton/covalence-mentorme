import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

import { postForm } from '../services/rest';
import { DEFAULT_NAVIGATION_NO_ARROW } from '../services/navigation';

export default class CameraRollScreen extends Component {

    constructor(props) {
        super(props);
        userid = this.props.navigation.state.params.userid;
    }

    static navigationOptions = DEFAULT_NAVIGATION_NO_ARROW;

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