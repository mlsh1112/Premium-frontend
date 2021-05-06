import React, { Component } from 'react';
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
import Calender from '../../src/components/Calender'
import colors from '../../src/colors'
const TuteeAutdetail=({navigation,route})=>{
  const project=route.params.project
  var startDate=new Date().getTime() - new Date(project.created_at).getTime();
  var remainDay=Math.floor(startDate / (1000 * 60 * 60 * 24))
  var pastDay=project.experience_period-remainDay
  function isTrial(){

    if (project.status==='trial') 
    return false
  }

  return(
    <ScrollView>
        
      <View >
        <Text style={styles.todaytext}>Title</Text>
        <View style={{borderColor:'#9FA5C0',
         borderBottomWidth:1,width:'100%',paddingTop:10}}/>
        
          <View style={{paddingBottom:20,paddingTop:20}}>
            <View style={styles.box2}>
              <View style={{paddingTop:10,paddingLeft:10}}>
                <View style={styles.imgbax}>
                </View>
              </View>
          </View>
      </View>
      
      <View style={{paddingBottom:10}}>
      <Text style={styles.todaytext}>전체 Title 일정</Text>
      <View style={{borderColor:'#9FA5C0',
         borderBottomWidth:1,width:'100%',paddingTop:10}}/>
      </View>
      <Calender/>
      
      <View style={{paddingBottom:10}}>
      <Text style={styles.todaytext}>오늘의 일정</Text>
      <View style={{borderColor:'#9FA5C0',
         borderBottomWidth:1,width:'100%',paddingTop:10}}/>
      </View>
      <View style={styles.box}>

        <View style={styles.box1}>
          <Text style={styles.plantext}>dddddddddddddddddddddddddddddddddddddddddddddddddddd</Text>
        </View>
      </View>
      <View alignItems='center' style={{paddingTop:30}}>
        {
          pastDay===0?
          <View>
            {
              project.status==='trial'?
              <Button onPress={()=>{navigation.navigate('ExperienceAuth',project)}}>프로젝트 신청하기</Button>
              :
              <Button onPress={()=>{navigation.navigate('AuthPayBack',project)}}>보증금 환급받기 </Button>
            }
          </View>
          
          :
          <Button onPress={()=>{navigation.navigate('TuteeAuthentication')}}>인증하기 </Button>

        }
      </View>
    </View>
    </ScrollView>
  )
}

const styles= {
  todaytext:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    textAlign:'center',
  },

  box:{
    alignItems: 'center',
    justifycontent:'center',
    paddingTop:10,
    width:350,
    flex:1,
    height:150,
    borderRadius:20,
    backgroundColor:'#1FCC79',
    
  },
  box1:{
    borderRadius:20,
    height:120,
    width:320,
    alignItems: 'center',
    justifycontent:'center',
    backgroundColor:'#e2f7e8',
  },
  
  box2:{
    borderRadius:20,
    height:120,
    width:350,
    backgroundColor:'#DDECCA',
    paddingBottom:20,
    justifyContent:'center'
  },
  imgbax:{
    borderRadius:20,
    height:90,
    width:100,
    backgroundColor:'white',
    
  },
  plantext:{
    fontSize:15,
    fontWeight:'bold',
    color:'black',
    paddingTop:15,
    paddingRight:10,
    paddingLeft:10,
    paddingBottom:10
  },
  pickerstyle:{
    width: "90%",
    marginTop:'1%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingRight: 30,
    color:"black"
},
precentPosition:{
    flex:1,
    margin: '10%',
    height:'25%'
},
presentTextStyle:{
    fontWeight:'bold',
    fontSize:20,
    color:colors.maincolor,
    marginBottom:'20%'
},
authTextStyle:{
    fontWeight:'bold',
    fontSize:20,
    color:'#FF6464',
    marginBottom:'20%'

},
percentStyle:{
    fontWeight:'bold',
    color:'#9FA5C0',
    fontSize:25
},
authtuteeStyle:{
    fontWeight:'bold',
    fontSize:20,
    color:'#9FA5C0',

},
tuteeBarStyle:{
    backgroundColor:'#D0DBEA',
    width:'80%',
    height:'60%',
    marginBottom:'5%',
    alignItems: 'center',
    borderRadius:20,
    flexDirection:'row'
},
tuteenameStyle:{
    marginLeft:'5%',
    fontSize:20,
},
tuteeBtnPosition:{
    marginLeft:'35%',
    backgroundColor:'#1FCC79',
    width:'30%',
    height:'60%',
    borderRadius:20,
    alignItems: 'center',
    justifyContent:'center',
},
BtntextStyle:{
    color:'white',
    fontWeight:'bold',
    fontSize:17
},
}

export default TuteeAutdetail


