import React, { useEffect, useState } from 'react';
import { Modal, View, Image,Text,TouchableOpacity,ScrollView,Alert } from 'react-native';
import {  Card,IconButton,Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';
import {Button} from '../components';
import {createattendances,getproject,getattendances} from '../Api'

const ProjectDetail =({navigation,route})=> {
  var [isJoin,setisJoin]=useState(false)
  var [isExperienced,setisExperienced]=useState(true)
  const project=route.params.project
  const [latestpr,setLatestpr] = useState(project)
  

  const handleAttendence=()=>{
    console.log(project.id)
    createattendances({
      "project_id" : project.id
    })
    .then(res=>{
      console.log(res)
      Alert.alert('7일 체험이 신청되었습니다.')
      navigation.navigate('ProjectTrial',{latestpr})
    })
    .catch(err=>{
      console.log("--------------create attendance error---------------")
      console.log(err)
    })
  }

  useEffect(()=>{
    getattendances()
    .then(res=>{
      if(res.data){
        res.data.map((pr)=>{
          if (pr.project.id===project.id){
            if (pr.status === 'trial'){setisJoin(true)}
          }
        })
      }
    })
    .catch(err => {
      console.log("---------------getattendances error--------------")
      console.log(err)
    })

    console.log(project)
    getproject(project.id).then(res => {
      console.log(res.data)
      setLatestpr(res.data)
    }).catch(e => {
      console.log("---------------getproject error--------------")
      console.log(e)
    });
    
  },[])
  return (
      <View style={styles.position}>
        <Card style={styles.cardStyle}>
          <ScrollView>
          <View style={{margin:20}}>
          <Text style={styles.titleStyle}>제목 : {latestpr.title}</Text>
         
          <View style={styles.eee}>
            <View style={styles.profile}>
              <View style={{flexDirection:'row', marginBottom:10 }}>
                <Image></Image>
                <TouchableOpacity onPress={()=> navigation.navigate('ProfileView',{latestpr})}>
                  <Text>튜터 : {latestpr.tutor.name}</Text>
                </TouchableOpacity>
              </View>
          </View>
          </View>
          <View style={styles.eee}>
              <Text style={styles.headStyle} >프로젝트 소개</Text>
              <Text style={styles.describeStyle}>{latestpr.description}</Text>
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
            <Text style={styles.describeStyle}>실천보증금 {latestpr.deposit}원</Text>
          </View>

          <View style={styles.eee}>
            <Text style={styles.headStyle} >프로젝트 기간</Text>
            <Text style={styles.describeStyle}>{latestpr.experience_period} DAYS</Text>
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
                    handleAttendence()
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
                    //handleAttendence()
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
