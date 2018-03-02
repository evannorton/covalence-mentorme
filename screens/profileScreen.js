import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { logout, getMe, getMentorSkills, getMentorSubjects } from '../services/user';




export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {},
            subjects: [],
            skills: []
        }
    }

    static navigationOptions = {
        headerStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
        }
    };

    async componentDidMount() {
        let me = await getMe();
        let subjects = await getMentorSubjects(me.id);
        let skills = await getMentorSkills(me.id);
        this.setState({
            me,
            subjects,
            skills
        });
        console.log(subjects)
    }

    async logout() {
        await logout();
        this.props.screenProps.navigation.navigate('Home');
    }

    photo() {
        alert('Clicked')
    }

    renderPhoto() {
        return (
            <View style={styles.imgContainer} >
                <Image
                    style={styles.image}
                    source={require('../images/profilephoto.jpg')}
                />
                <View style={styles.plusContainer}>
                    <Text style={styles.plus} onPress={() => { this.photo() }}>
                        +
                    </Text>

                </View>
            </View>
        )
    }

    renderName() {
        return (
            <View style={styles.nameContainer}>
                <Text style={styles.name}>
                    {this.state.me.name}
                </Text>
            </View>
        )
    }

    renderWage() {
        return (
            <View style={styles.wageContainer}>
                <Text style={styles.wage}>
                    ${this.state.me.rate}/hour
                </Text>
            </View>
        )
    }


    renderBio() {
        return (
            <View style={styles.bio}>
                <Text>
                    {this.state.me.bio}
                </Text>
            </View>
        )
    }

    renderSubjects() {
        return (
            <View style={styles.subjects}>
                <Text>
                    {this.state.me.subjects}
                </Text>
            </View>
        )
    }

    renderSkills() {
        return (
            <View style={styles.skillsContainer}>
                <Text style={styles.skills}>
                    {this.state.me.skills}
                </Text>
            </View>
        )
    }

    renderContact() {
        return (
            <View style={styles.contactContainer}>
                <Text style={styles.contact}  >
                    CONTACT INFO:
                </Text>
                <Text style={styles.contact}>
                    email: {this.state.me.email}
                </Text>
                <Text style={styles.contact}>
                    phone: {this.state.me.phone}
                </Text>
            </View>
        )
    }


    renderLogout() {
        return (
            <View style={styles.logout}>
                <Button
                    text='log out'
                    onPress={() => { this.logout() }}
                />
            </View>
        );
    }

    render() {
        if (this.state.me.usertype === 'Mentor') {
            return (
                <View style={styles.container}>
                    {this.renderPhoto()}
                    {this.renderName()}
                    {this.renderWage()}
                    {this.renderBio()}
                    {this.renderContact()}
                    {this.renderLogout()}
                </View>
            );

        } else {
            return (
                <View style={styles.container}>
                    {this.renderPhoto()}
                    {this.renderName()}
                    {this.renderBio()}
                    {this.renderContact()}
                    {this.renderLogout()}
                </View>
            )
        }
    };
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'column',

    },

    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },

    image: {
        resizeMode: 'cover',
        width: 150,
        height: 150,
        borderRadius: 75
    },

    plusContainer: {
        width: 30,
        height: 30,
        backgroundColor: 'rgba(255,254,226,0.7)',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        bottom: 33,
        left: 50,
        justifyContent: 'center',


    },

    plus: {
        textAlign: 'center',
        fontSize: 40,
        bottom: 3
    },

    imgContainer: {
        flex: 0,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,


    },

    logout: {
        flex: 0,
        borderColor: 'black',
        borderWidth: 2
    },

    bio: {
        borderColor: 'black',
        borderWidth: 2,
        flex: 0,
        paddingLeft: 20,
        paddingRight: 20,

    },

    nameContainer: {
        borderColor: 'black',
        borderWidth: 2,
        flex: 0,

    },

    name: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30

    },

    wageContainer: {
        borderColor: 'black',
        borderWidth: 2,
        flex: 0,
    },

    wage: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20

    },

    subjectsContainer: {
        borderColor: 'black',
        borderWidth: 2,
        flex: 0,
    },

    subjects: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20

    },

    skillsContainer: {
        borderColor: 'black',
        borderWidth: 2,
        flex: 0,
    },

    skills: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20

    },

    contactContainer: {
        borderColor: 'black',
        borderWidth: 2,
        flex: 0,
    },

    contact: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,

    },


});