import React, { Component,useState,useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView

  } from 'react-native';
import TuteeAuthList from '../AuthenticationScreen/TuteeAuthList'
import TutorAuthList from '../AuthenticationScreen/TutorAuthList'
import AsyncStorage from '@react-native-community/async-storage';
import {getproject} from '../../src/Api'

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
                userType==='Tutor' ? (
                    <TutorAuthList navigation={navigation}></TutorAuthList>
                ):(
                    <TuteeAuthList navigation={navigation}></TuteeAuthList>
                    
                )
            }
            
      </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        width: "100%",
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
