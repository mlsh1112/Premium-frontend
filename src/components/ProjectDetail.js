import AsyncStorage from '@react-native-community/async-storage';
import React, { Component, useEffect, useState } from 'react';
import { Modal, View, Image,Text,TouchableOpacity,ScrollView,Alert } from 'react-native';
import {  Card,IconButton,Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';
import {Button} from '../components';

const ProjectDetail =({navigation,route})=> {
   var [liked,setLiked]=useState(false)
   var [isJoin,setisJoin]=useState(false)
   var [isExperienced,setisExperienced]=useState(true)
   var [myprj,setMyprj]=useState() // 참가하고 있는 프로잭트
   const project=route.params.project

  const _toggle = () => {
    let localLiked = liked;
    // Toggle the state variable liked
    localLiked = !localLiked;
    setLiked( liked = localLiked);
  };
  useEffect(()=>{
    const getData= async()=>{
      await AsyncStorage.getItem('projects')
      .then(res=>setMyprj(JSON.parse(res)))
      .catch(err=>console.log(err))
    }
    getData()

    const myprojects=()=>{
      if(myprj){
         myprj.map((proj)=>{
            if (proj.project.id===project.id){
              if (proj.status === 'trial'){
                setisJoin(true)
      }}})
        }
      }
    myprojects()
  })
  return (
      <View style={styles.position}>
        <Card style={styles.cardStyle}>
          <ScrollView>
          <View style={{margin:20}}>
          <Text style={styles.titleStyle}>{route.params.project.title}</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.subjectStyle}>고등 수학 / 수학</Text>
            <TouchableOpacity style={styles.likeStyle} onPress={()=>_toggle()}>
            {liked === false ? (
              <MaterialCommunityIcons name='heart-outline' size={20} color={colors.maincolor}/>
            ) : (
              <MaterialCommunityIcons name='heart' size={20} color={colors.maincolor}/>
            )}<Text style={styles.likeText}>273 LIKES</Text>
            </TouchableOpacity>
            </View>
          <View style={styles.eee}>
            <View style={styles.profile}>
              <View style={{flexDirection:'row', marginBottom:10 }}>
                <Image></Image>
                <Text>이모씨</Text>
              </View>
          </View>
          </View>
          <View style={styles.eee}>
              <Text style={styles.headStyle} >프로젝트 소개</Text>
              <Text style={styles.describeStyle}>{route.params.project.description}</Text>
          </View>

          <View style={styles.eee}>
              <Text style={styles.headStyle} >인증 방법</Text>
              <View style={{flexDirection:'row', marginBottom:10 }}>
              <MaterialCommunityIcons name='checkbox-marked-outline' size={26} color={colors.maincolor}/>
              <Text style={styles.describeStyle}> 공부 시간 인증</Text>
            </View>
          </View>

          <View style={styles.eee}>
            <Text style={styles.headStyle} >보증금</Text>
            <Text style={styles.describeStyle}>실천보증금 {route.params.project.deposit}원</Text>
          </View>

          <View style={styles.eee}>
            <Text style={styles.headStyle} >프로젝트 기간</Text>
            <Text style={styles.describeStyle}>{route.params.project.experience_period} DAYS</Text>
          </View>
          </View>
        </ScrollView>
        </Card>
        <View style={styles.buttonStyle}>
          {
            isExperienced ?
                <View>
              { isJoin === false ? (
                  <Button onPress={()=>{
                    Alert.alert('7일 체험이 신청되었습니다.')
                    navigation.navigate('ProjectTrial',{project})
                  }}>7 DAYS  체험하기</Button> 
                  ):(
                    <Button onPress={()=>{
                    }}>진행 중인 프로젝트 입니다.</Button> 
                  )
              }</View>
            :
              <View>
              { isJoin === false ? (
                  <Button onPress={()=>{
                    Alert.alert('프로젝트가 신청되었습니다.')
                    navigation.navigate('Authentication')
                  }}>프로젝트 신청하기</Button> 
                  ):(
                    <Button onPress={()=>{
                    }}>진행 중인 프로젝트 입니다.</Button> 
                  )
              }</View>
          }
          
        </View>
      </View>
    );
  
}


  const styles={
    position:{
      margin:20
    },
    cardStyle:{
      height:'89%'
    },
    titleStyle:{
      fontWeight:'bold',
      fontSize:20,
      marginBottom:15

    },
    subjectStyle:{
      fontWeight:'bold',
      fontSize:15,
      color:'#9FA5C0',
      marginBottom:15
    },
    likeStyle:{
      flexDirection:'row',
      left:110
    },
    likeText:{
      fontWeight:'bold',
      color:colors.maincolor,
      fontSize:17,
      marginLeft:5
    },
    eee:{
    width: '100%',
    justifyContent: 'space-between',
    borderColor:'#eee',
    borderBottomWidth:2,
    padding: 5,
    marginTop:10

    },

    profile:{
    flexDirection: 'row',
    alignItems: 'center',

    },
    headStyle:{
      fontSize:19,
      fontWeight:'bold',
      color:'#3E5481',
      marginTop:15,
      marginBottom:15
    },
    describeStyle:{
      color:'#9FA5C0',
      fontSize:19,
      marginBottom:30
    },
    buttonStyle:{
      margin:20
    }
  }
export default ProjectDetail;
