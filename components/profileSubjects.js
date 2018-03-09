import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';


export default class ProfileSubjects extends Component {
    render() {
        return (
            <Overlay
                containerStyle={styles.overlayContainer}
                overlayStyle={styles.overlay}
                fullScreen={true}
                isVisible={this.state.isSubjectsVisible}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Button onPress={() => { this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: false }); }} text='Back to Profile' />
                    <Text style={styles.overlayText}>My Subjects</Text>
                    <View style={styles.mySubjectsContainer}>
                        {
                            this.state.mySubjects.map((subject) => {
                                return (
                                    <View style={styles.mySubjects}>
                                        <Text
                                            onPress={() => {
                                                deleteMentorSubject(this.state.me.id, subject.id)
                                                    .then(() => {
                                                        this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: true });
                                                    });
                                            }}
                                            key={subject.id}>
                                            {subject.name}
                                        </Text>
                                    </View>
                                );
                            })
                        }
                    </View>
                    <Text style={styles.overlayText}>Add Subjects</Text>
                    <View style={styles.accordian}>
                        {
                            this.state.categories.map((category) => {
                                return (
                                    <Accordion
                                        sections={[category.name]}
                                        renderHeader={() => {
                                            return (
                                                <View style={styles.sectionContainer}>
                                                    <View style={styles.section}>
                                                        <Text key={category.id} >{category.name}</Text>
                                                    </View>
                                                </View>

                                            );
                                        }}
                                        renderContent={() => {
                                            return (
                                                <ProfileSubject
                                                    refresh={() => { this.props.screenProps.navigation.navigate('Tab', { isSubjectsVisible: true }) }}
                                                    userid={this.state.me.id}
                                                    subjects={this.state.subjects}
                                                    categoryid={category.id}
                                                />
                                            );
                                        }}
                                    />
                                );
                            })
                        }
                    </View>
                </ScrollView>
            </Overlay>
        );
    }
}

