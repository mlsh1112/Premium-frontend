import React, { Component,useState,useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text
  } from 'react-native';
import TuteeAuthentication from '../AuthenticationScreen/TuteeAuthentication'
import TutorAuthentication from '../AuthenticationScreen/TutorAuthentication'
import Tutor from '../AuthenticationScreen/TutorAuthCheck';
import AsyncStorage from '@react-native-community/async-storage';

const Authentication = ({navigation}) => {
    [userType, setuserType] = useState('');

    useEffect(() => {
    async function getData(){
        const type = await AsyncStorage.getItem('type');
        console.log(type)
        setuserType(type)
      }
      getData()
    })


    return (
        <View style={styles.container}>
            <View style={{borderColor:'#9FA5C0',
        borderBottomWidth:2,width:'100%',marginBottom:'5%'}}>
        <Text style={styles.projecttextStyle}>프로젝트 인증하기</Text>
        </View>
            {
                userType==='Tutee' ? (
                    <TuteeAuthentication ></TuteeAuthentication>
                ):(
                    <TutorAuthentication navigation={navigation}></TutorAuthentication>
                )
            }
            
      </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        width: "100%",
        justifyContent:'center',
        alignItems: 'center',
    },
    projecttextStyle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#3E5481',
        right:'0%',
        margin:'5%',
        marginTop:'15%',
    }
  });

export default Authentication;
