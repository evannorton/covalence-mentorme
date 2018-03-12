import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, CheckBox, Divider } from 'react-native-elements';

export default class MentorListSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked1: false,
            checked2: false,
            checked3: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Refine search by skill(s):</Text>
                <View style={styles.inputsContainer}>
                    <Input
                        containerStyle={styles.inputContainer}
                        placeholder="skill 1"
                        onChangeText={(skill1) => { }}
                    />
                    <Input
                        containerStyle={styles.inputContainer}
                        placeholder="skill 2"
                        onChangeText={(skill2) => { }}
                    />
                    <Input
                        containerStyle={styles.inputContainer}
                        placeholder="skill 3"
                        onChangeText={(skill3) => { }}
                    />
                </View>
                <Text>Refine search by hourly rate:</Text>
                <View style={styles.checkboxesContainer}>
                    <CheckBox
                        onIconPress={() => { this.setState({ checked1: !this.state.checked1 }) }}
                        containerStyle={styles.checkboxContainer}
                        title='$'
                        checked={this.state.checked1}
                    />
                    <CheckBox
                        onIconPress={() => { this.setState({ checked2: !this.state.checked2 }) }}
                        containerStyle={styles.checkboxContainer}
                        title='$$'
                        checked={this.state.checked2}
                    />
                    <CheckBox
                        onIconPress={() => { this.setState({ checked3: !this.state.checked3 }) }}
                        containerStyle={styles.checkboxContainer}
                        title='$$$'
                        checked={this.state.checked3}
                    />
                </View>
                <View style={{ flex: 0, flexDirection: 'row', marginTop: 10 }}>
                    <Divider style={{ height: 1, flex: 1, backgroundColor: '#515151' }} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 0,
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center'
    },

    inputsContainer: {
        flex: 0,
        flexDirection: 'row'
    },

    inputContainer: {
        margin: 5,
        flex: 0,
        width: 120,
        height: 30
    },

    checkboxesContainer: {
        flex: 0,
        flexDirection: 'row'
    },

    checkboxContainer: {
        flex: 1,
    }

});