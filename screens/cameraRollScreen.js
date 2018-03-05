import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

export default class CameraRollScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: ''
        }
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

    render() {
        return (
            <CameraRollPicker
                callback={this.getSelectedImages}
                maximum={1}
            />
        );
    }
}