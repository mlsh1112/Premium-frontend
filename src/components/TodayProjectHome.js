import React, { Component } from 'react';
import { View, Image,Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import authBtn from '../../assets/authBtn-001.png'
import homelogo from '../../assets/homeLogo2.png'
import Moment from 'moment';
class Projectcard extends Component {
    
    
    render() {
        var startDate=new Date().getTime() - new Date(this.props.startDay).getTime();
        var remainDay=Math.floor(startDate / (1000 * 60 * 60 * 24))
        var pastDay=this.props.data.experience_period-remainDay
    
        return (
        <View style={{marginLeft:30}}>
        <Card >
            <View style={styles.card} >
                <View style={{margin:15, marginLeft:25}}>
                <Text style={styles.textstyle}>{this.props.data.title}</Text>
                <View style={{flexDirection:'row',margin:2}}>
                <Text style={styles.dayStyle}>{remainDay+1} </Text>
                <Text style={styles.dayStyle2}>일 인증</Text>
                </View>
                <Text style={styles.dayStyle3}>남은 인증 {pastDay-1}일</Text>
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
