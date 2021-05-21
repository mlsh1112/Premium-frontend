import React, { Component,useState } from 'react';
import colors from '../../src/colors';
import {
    StyleSheet,
    View,
    Text,
    Image
  } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../src/components';


const TutorAuthCheck = ({navigation, route}) => {
    const tutee=route.params
    console.log(tutee.target)
    return (
        <View style={styles.container}>
            <View style={styles.tuteeBarStyle}>
            <Icons name='face' size={30}></Icons>
            <Text style={styles.tuteenameStyle}>{tutee.target.name}</Text>
        </View>
        <View style={styles.tuteeBarStyle}>
            <Text style={styles.textStyle}>Today 인증 내용 👍</Text>
        </View>
        <View style={styles.fileboxStyle}>
          <Image
            style={{height:'50%',width:'50%'}}
            source={{uri:tutee.target.image.small.url}}/>
        </View>

        <Button onPress={() => navigation.pop()}>{tutee.name} 님  인증 확인 ✌️</Button>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        width: "100%",
        height:'100%',
        alignItems: 'center',
        margin:'0%',
        marginTop:'5%'
    },
    tuteeBarStyle:{
        width:'80%',
        alignItems: 'center',
        flexDirection:'row',
        margin:'3%'
    },
    tuteenameStyle:{
        marginLeft:'5%',
        fontSize:20,
        fontWeight:'bold',
    },
    textStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:'#3E5481',
    },
    fileboxStyle:{
        backgroundColor:'#D0DBEA',
        width:'90%',
        height:'50%',
        marginBottom:'30%',
        alignItems: 'center',
        borderRadius:20,
    }
  });

export default TutorAuthCheck;
