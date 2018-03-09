import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import { postMentorSubject } from '../services/user';

export default class ProfileSubject extends Component {

    render() {
        return (
            <View>
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
                                <View style={styles.contentContainer}>
                                <View key={subject.id} style={styles.content} >
                                <Text>
                                    {subject.name}
                                </Text>
                                </View>
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
        flex: 1,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
    },
    contentContainer:{
        flex: 0,
        flexDirection: 'row',
    }
})