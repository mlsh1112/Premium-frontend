import React, { Component } from 'react';
import { View, Image,Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import authBtn from '../../assets/authBtn-001.png'
import homelogo from '../../assets/homeLogo2.png'
class Projectcard extends Component {
    
    
    render() {
        return (
        <View style={{marginLeft:30}}>
        <Card >
            <View style={styles.card} >
                <View style={{margin:15, marginLeft:25}}>
                <Text style={styles.textstyle}>{this.props.data.title}</Text>
                <View style={{flexDirection:'row',margin:2}}>
                <Text style={styles.dayStyle}>34 </Text>
                <Text style={styles.dayStyle2}>일 인증</Text>
                </View>
                <Text style={styles.dayStyle3}>남은 인증 56일</Text>
                </View>
                <TouchableOpacity style={{marginLeft:"25%"}} onPress={() => {
                    this.props.navigation.navigate('Authentication')
                }}>
                <Image source={authBtn} style={{width:130,height:100}}></Image>
                </TouchableOpacity>
            </View>
        </Card>
      </View>

      
        );
    }
}

const styles={
    card:{
        borderWidth:0,
        borderRadius:20,
        width:350,
        height:100,
        flexDirection:'row'
    },
    textstyle:{
        fontSize:19,
        margin:2
    },
    dayStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:"red"
    },
    dayStyle2:{
        fontWeight:'bold',
        fontSize:20,
    },
    dayStyle3:{
        fontSize:15,
        color:"#9E9E9E",
        margin:2
    }

    
}


export default Projectcard;
