import React, {Component} from 'react'
import {Image, StyleSheet} from 'react-native'

export default class HeaderImage extends Component {




render(){
    return(
        <Image style={styles.Image} source={require('../images/mentorme.jpeg')}/>
    )
}
}
const styles = StyleSheet.create({
    Image:{
        height: 45,
        width: 250,
    }

});
