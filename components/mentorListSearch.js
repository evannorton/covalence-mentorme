import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, CheckBox, Divider } from 'react-native-elements';

export default class MentorListSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked1: false,
            checked2: false,
            checked3: false,
            text1: '',
            text2: '',
            text3: ''
        }
    }

    componentWillReceiveProps() {
        if (this.props.clearInputs) {
            this.setState({
                checked1: false,
                checked2: false,
                checked3: false,
            });
            this.input1.clear();
            this.input2.clear();
            this.input3.clear();
        }
    }

    checkGap(checked1, checked2, checked3) {
        if (checked1 && checked3) {
            checked2 = true;
            this.setState({ checked2: true });
        }
        this.props.setWage(checked1, checked2, checked3);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Refine search by skill(s):</Text>
                <View style={styles.inputsContainer}>
                    <Input
                        ref={input => this.input1 = input}
                        onChangeText={async (text1) => {
                            await this.setState({ text1 });
                        }}
                        onEndEditing={() => { this.props.setSkills(this.state.text1, this.state.text2, this.state.text3) }}
                        style={styles.input}
                        containerStyle={styles.inputContainer}
                        placeholder="skill 1"
                    />
                    <Input
                        ref={input => this.input2 = input}
                        onChangeText={async (text2) => {
                            await this.setState({ text2 });
                        }}
                        onEndEditing={() => { this.props.setSkills(this.state.text1, this.state.text2, this.state.text3) }}
                        style={styles.input}
                        containerStyle={styles.inputContainer}
                        placeholder="skill 2"
                    />
                    <Input
                        ref={input => this.input3 = input}
                        onChangeText={async (text3) => {
                            await this.setState({ text3 });
                        }}
                        onEndEditing={() => { this.props.setSkills(this.state.text1, this.state.text2, this.state.text3) }}
                        style={styles.input}
                        containerStyle={styles.inputContainer}
                        placeholder="skill 3"
                    />
                </View>
                <Text>Refine search by hourly rate:</Text>
                <View style={styles.checkboxesContainer}>
                    <CheckBox
                        onIconPress={() => {
                            let checked1 = !this.state.checked1;
                            let checked2 = this.state.checked2;
                            let checked3 = this.state.checked3;
                            this.setState({ checked1 });
                            this.checkGap(checked1, checked2, checked3);
                        }}
                        containerStyle={styles.checkboxContainer}
                        title='$'
                        checked={this.state.checked1}
                    />
                    <CheckBox
                        onIconPress={() => {
                            let checked1 = this.state.checked1;
                            let checked2 = !this.state.checked2;
                            let checked3 = this.state.checked3;
                            this.setState({ checked2 });
                            this.checkGap(checked1, checked2, checked3);
                        }}
                        containerStyle={styles.checkboxContainer}
                        title='$$'
                        checked={this.state.checked2}
                    />
                    <CheckBox
                        onIconPress={() => {
                            let checked1 = this.state.checked1;
                            let checked2 = this.state.checked2;
                            let checked3 = !this.state.checked3;
                            this.setState({ checked3 });
                            this.checkGap(checked1, checked2, checked3);
                        }}
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

    input: {
        height: 40,
        width: 120
    },

    checkboxesContainer: {
        flex: 0,
        flexDirection: 'row'
    },

    checkboxContainer: {
        flex: 1,
    }

});