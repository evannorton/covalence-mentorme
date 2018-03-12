import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, } from 'react-native';
import {Calendar, CalenderList, Agenda} from 'react-native-calendars'
import { Button } from 'react-native-elements';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';
import { getMe } from '../services/user';



export default class CalendarScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            me: {},
        }
    }

    static navigationOptions = {
        title: 'Calendar',
        tabBarIcon:
            <Image
                source={require('../images/calendaricon.png')}
                style={{ width: 40, height: 40, }}
            />

    }

    async componentDidMount(){
        let me = await getMe();
        this.setState({
            me,
        });
    }

    navigate(screen) {
        userType = this.props.navigation.state.params.userType;
        this.props.navigation.navigate(screen, { userType });
    };

    renderItem(item) {
        return (
          <View style={styles.item}>
          <View style={styles.layout2}>
          <View style={styles.layout}>
          <Text>Class:</Text>
          </View>
          <View style={styles.layout}>
          <Text>Time:</Text>
          </View>
          <View style={styles.layout}>
          <Text>Student:</Text>
          </View>
          </View>
          <View style={styles.layout2}>
          <View style={styles.layout}>
          <Text>Piloting</Text>
          </View>
          <View style={styles.layout}>
          <Text>4:30</Text>
          </View>
          <View style={styles.layout}>
          <Text>Luke</Text>
          </View>
          </View>
          </View>
        );
      }
    
      renderEmptyDate() {
        return (
          <View style={styles.emptyDate}><Text></Text></View>
        );
      }

    render() {

        if (this.state.me.usertype === 'Mentor') {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Mentor Calendar Screen</Text>
                    <Agenda 
                    items={
                        {'2018-03-12': [],
                         '2018-03-13': [],
                         '2018-03-14': [],
                         '2018-03-15': [{text: this.state.me},{text:this.state.me}],
                         '2018-03-16': [{text:this.state.me},{text:this.state.me}],
                        }}
                        renderItem={this.renderItem.bind(this)}
                        renderEmptyDate={this.renderEmptyDate.bind(this)}
                       
                    
                        rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
                    />
                </View>
            );

        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Student Calendar Screen</Text>
                    <Agenda 
                    items={
                        {'2018-03-12': [],
                         '2018-03-13': [],
                         '2018-03-14': [],
                         '2018-03-15': [{text: this.state.me}],
                         '2018-03-16': [{text:this.state.me}],
                        }}
                        renderItem={this.renderItem.bind(this)}
                        renderEmptyDate={this.renderEmptyDate.bind(this)}
                        rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
                    />
                </View>
            )
        }
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center'
    },

    text: {
        textAlign: 'center'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        
      },
      emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
      },
      layout:{
          flex:1,
          padding: 5,
          
      },
     layout2:{
        flex:1,
        flexDirection: 'row',
      },
    
  

});