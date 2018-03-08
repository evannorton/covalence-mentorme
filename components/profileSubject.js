import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import { postMentorSubject } from '../services/user';

export default class ProfileSubject extends Component {

    render() {
        return (
            <View >
                {
                    this.props.subjects.map((subject) => {
                        if (subject.categoryid === this.props.categoryid) {
                            return (
                                <TouchableOpacity onPress={() => {
                                    postMentorSubject(this.props.userid, subject.id)
                                        .then(() => {
                                            this.props.refresh();
                                        })
                                }}>
                                <View key={subject.id} style={styles.content} >
                                <Text>
                                    {subject.name}
                                </Text>
                                </View>
                                </TouchableOpacity>
                                
                            );
                        }
                    })
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    content:{
        backgroundColor: 'blue',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 360,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
    }
})