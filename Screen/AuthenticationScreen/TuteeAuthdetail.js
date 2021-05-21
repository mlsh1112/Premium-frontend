import React, { Component, useEffect, useState } from 'react';

import {getPlan} from '../../src/Api'
import {Button} from '../../src/components/Button'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    TextInput,
    Keyboard,
  } from 'react-native';
import { Card } from 'react-native-paper';
import Calender from '../../src/components/Calender'
import colors from '../../src/colors'
import ProgressBar from "react-native-animated-progress";
const TuteeAutdetail=({navigation,route})=>{
 
    const project=route.params.project
    var startDate=new Date().getTime() - new Date(project.created_at).getTime();
    var remainDay=Math.floor(startDate / (1000 * 60 * 60 * 24))
    var pastDay=project.project.experience_period-remainDay
    var auths=3
    var percent = Math.floor((auths/project.project.experience_period)*100)
    console.log(project)
    var Trial_Comment=`현재 체험기간 ${pastDay} 일 남았습니다. `

    
  /*useEffect(()=>{
      console.log((project.id))
      getPlan("83").then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err)
      })
  })*/

  return(
    <ScrollView >
      <View style={styles.cardBack}>
        <Text style={styles.cardText}>{project.project.title} 의 진행 사항</Text>
        <Card style={styles.cardStyle}>
          <View style={styles.dayTextPosition}>
            <View style={styles.textPosition}>
              <Text style={styles.redDayText}>{remainDay}</Text><Text style={styles.blackDayTxt}>일 차  |</Text>
            </View>
            <View style={styles.textPosition}>
              <Text style={styles.redDayText}>{auths+1}</Text><Text style={styles.blackDayTxt}>번째 인증</Text>
            </View>
          </View>
          <View >
              {
                pastDay<=0?
                <Text style={styles.grayDayTxt}>종료된 프로젝트 입니다!</Text>
                :
                <View style={styles.textPosition}>
                <Text style={styles.grayDayTxt}>남은 인증 날 : </Text>
                <Text style={styles.grayDayTxt}>{pastDay-1}</Text>
                <Text style={styles.grayDayTxt}>일</Text>
                </View>
              }
            </View>

            <View style={{paddingTop:30}}>
              <View style={{flexDirection:'row',marginBottom:20}}>
              <Text style={styles.grayDayTxt}>인증률</Text>
              <Text style={styles.percentTxt}>{percent}%</Text>
              </View>
              <ProgressBar progress={percent} height={7} backgroundColor={colors.subcolor} />
            </View>
        </Card>
      </View>
    </ScrollView>
  )
}

const styles={
  cardBack:{
    flex:1,
    backgroundColor:colors.maincolor,
    padding:20,
    alignItems:'center'
  },
  cardText:{
    color:'white',
    fontWeight:'bold',
    fontSize:23,
    marginBottom:20,
  },
  cardStyle:{
    width:'100%',
    height:200,
    borderRadius:20,
    padding:25
  },
  textPosition:{
    flexDirection:'row',
    paddingRight:10
  },
  dayTextPosition:{
    flexDirection:'row',
    paddingBottom:10
  },
  redDayText:{
    color:'red',
    fontWeight:'bold',
    fontSize:20
  },
  blackDayTxt:{
    fontWeight:'bold',
    fontSize:20
  },
  grayDayTxt:{
    color:'grey',
    fontSize:17
  },
  barStlye:{
    width:'100%',
    height:3,
    backgroundColor:'grey'
  },
  percentTxt:{
    fontWeight:'bold',
    fontSize:27,
    marginLeft:'65%'
  }

}


export default TuteeAutdetail


