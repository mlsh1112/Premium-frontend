import React, { Component, useEffect, useState } from 'react';

import {getPlan} from '../../src/Api'
import {Button} from '../../src/components/Button'
import {
    View,
    Text,
    ScrollView,
    LogBox,
  } from 'react-native';
import { Card } from 'react-native-paper';
import Calender from '../../src/components/Calender'
import colors from '../../src/colors'
import ProgressBar from "react-native-animated-progress";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const TuteeAutdetail=({navigation,route})=>{
 
    const project=route.params.project
    var startDate=new Date().getTime() - new Date(project.created_at).getTime();
    var remainDay=Math.floor(startDate / (1000 * 60 * 60 * 24))
    var pastDay=project.project.experience_period-remainDay
    var auths=project.auth_count
    var percent = Math.floor((auths/project.project.experience_period)*100)
    var requireTime = project.project.required_time
    var reviewTime = 0
    requireTime===0?reviewTime = 0: reviewTime = Math.floor(project.project.review_weight/requireTime)
    var studyTime = requireTime-reviewTime
    var [plans,setPlans]=useState()


  useEffect(()=>{
      console.log(project.id)
       getPlan({
        "project_id":41
      }).then((res)=>{
         setPlans(res.data);
      })
      .catch((err)=>{
        console.log(err)
      })


      LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

  },[])

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

      <View alignItems='center' style={{padding:30}}>
        {
          pastDay<=0?
          <View>
            {
              project.status==='trial'?
              <Button onPress={()=>{navigation.navigate('ExperienceAuth',{project,percent})}}>프로젝트 신청하기</Button>
              :
              <Button onPress={()=>{navigation.navigate('AuthPayBack',project)}}>보증금 환급받기 </Button>
            }
          </View>
          
          :
          <Button onPress={()=>{navigation.navigate('TuteeAuthentication',project)}}>인증하기 </Button>

        }
      </View>

      <View style={styles.todayplanBack}>
        <Text style={styles.titleTxt}>Today 일정 👻 </Text>
        <Card style={styles.cardStyle}>
          <View style={styles.todayTxt}>
            {plans.chapter?
            <Text style={styles.todayblackTxt}>⦁ 오늘 진행할 챕터 {plans.chapter}
            :
            </Text>:<Text style={styles.todayblackTxt}>⦁ 오늘 진행할 챕터 : </Text>
            }
            <Text style={styles.todayredTxt}> {}</Text>
          </View>
          <View style={styles.todayTxt}>
            <Text style={styles.todayblackTxt}>⦁ 공부 시간 : </Text>
            <Text style={styles.todayredTxt}>{studyTime}</Text>
            <Text style={styles.todayblackTxt}> 시간</Text>
          </View>
          <View style={styles.todayTxt}>
            <Text style={styles.todayblackTxt}>⦁ 복습 시간 : </Text>
            <Text style={styles.todayredTxt}>{reviewTime}</Text>
            <Text style={styles.todayblackTxt}> 시간</Text>
          </View>
            <Text style={styles.todayblackTxt}>⦁ 인증 방법</Text>
            <View style={{flexDirection:'row'}}>
              <MaterialCommunityIcons name='checkbox-marked-outline' size={26} color={colors.maincolor} style={{margin:4}}/>
              <Text style={{margin:4,color:'grey',fontSize:16}}>{project.project.mission}</Text>
            </View>
        </Card>
      </View>

      <View style={styles.todayplanBack}>
        <Text style={styles.titleTxt}>{project.project.title} 전체 일정 💫</Text>
        <Calender/>
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
    paddingRight:10,
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
  },
  todayplanBack:{
    flex:1,
    padding:20,
    
  },
  titleTxt:{
    fontWeight:'bold',
    fontSize:20,
    paddingLeft:8,
    paddingBottom:13
  },
  todayTxt:{
    flexDirection:'row',
    paddingBottom:8
  },
  todayblackTxt:{
    fontWeight:'bold',
    fontSize:15
  },
  todayredTxt:{
    fontWeight:'bold',
    fontSize:15,
    color:'red'
  }


}


export default TuteeAutdetail


