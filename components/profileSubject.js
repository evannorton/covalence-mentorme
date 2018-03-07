import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { postMentorSubject } from '../services/user';

export default class ProfileSubject extends Component {

    render() {
        return (
            <View>
                {
                    this.props.subjects.map((subject) => {
                        if (subject.categoryid === this.props.categoryid) {
                            console.log(subject);
                            return (
                                <Text onPress={() => { postMentorSubject(this.props.userid, subject.id) }}>{subject.name}</Text>
                            );
                        }
                    })
                }
            </View>
        );
    }

}