import React, { useEffect, useState } from 'react';
import { Modal, View, Image,Text,TouchableOpacity,ScrollView,Alert } from 'react-native';
import {  Card,IconButton,Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';
import {Button} from '../components';
import {createattendances,getproject,getattendances,getcurrentuser,deleteproject,quitproject} from '../Api'

const ProjectDetail =(props)=> {
  // console.log(props)
  var [isJoin,setisJoin]=useState(false)
  var [isExperienced,setisExperienced]=useState(true)
  const project=props.route.params.project
  const [latestpr,setLatestpr] = useState(project)
  const [myinfo,setMyinfo] = useState(
    {
      "email": "", "id": -1, "image": "", "info": "", "likes_count": -1, "name": "", "phone": "", "status": "", "type": ""
    }
  )

  const handleAttendence=()=>{
    console.log(project.id)
    createattendances({
      "project_id" : project.id
    })
    .then(res=>{
      console.log(res)
      Alert.alert('체험기간 신청이 완료되었습니다.')
      props.navigation.navigate('ProjectTrial',{latestpr})
    })
    .catch(err=>{
      console.log("--------------create attendance error---------------")
      console.log(err)
    })
  }
  const tutordeleteproject = () => {
    console.log('프로젝트 삭제!!')
    Alert.alert("프로젝트를 정말 삭제하시겠습니까?","프로젝트를 삭제하실 경우 보상은 얻으실 수 없습니다.",[
      { text: "확인", onPress: () => {
          console.log("확인 누름")
          deleteproject(latestpr.id).then(res => {
            console.log('--------- delete project ----------')
            console.log(res.data)
            props.navigation.popToTop()
          }).catch(e => {
            console.log('========= delete project error =========')
            console.log(e)
          })   
        }
      },
      { text: "취소", onPress: () => {
          console.log("취소 누름")
        }
      }
      ]
    )
  }
  const tuteequitproject = () => {
    console.log('프로젝트 그만두기!!!')
    try {
      Alert.alert("프로젝트를 정말 그만 두시겠습니까?","체험기간 이후의 프로젝트 중도 하차는 보증금 환급이 어려울 수 있습니다.",[
        { text: "확인", onPress: () => {
            console.log("확인 누름")
            quitproject({project_id:latestpr.id}).then(res => {
              console.log('--------- quit project ----------')
              console.log(res)
              props.navigation.popToTop()
            }).catch(e => {
              console.log('========= quit project error =========')
              console.log(e)
            })   
          }
        },
        { text: "취소", onPress: () => {
            console.log("취소 누름")
          }
        }
        ]
      )
    } catch (error) {
      console.log('-------------------- error -------------------')
      console.log(error)
    }
  }
  useEffect(()=>{
    const rerender = props.navigation.addListener('focus', e =>{
      console.log("effect is working")
      getattendances().then(res=>{
        if(res.data){
          res.data.map((pr)=>{
            if (pr.project.id === project.id && pr.status === 'trial'){
              setisJoin(true)
            }
          })
        }
        getproject(project.id).then(res => {
          console.log("---------------getproject--------------")
          console.log(res.data)
          setLatestpr(res.data)
          getcurrentuser().then(res => {
            console.log(res.data)
            setMyinfo(res.data)
          }).catch(e => {
            console.log('============get current user error =========')
            console.log(e.response.status)
          })
        }).catch(e => {
          console.log("---------------getproject error--------------")
          console.log(e.response.data)
        });
      })
      .catch(err => {
        console.log("---------------getattendances error--------------")
        console.log(err)
      })
    })
  },[props.navigation])
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
                <TouchableOpacity onPress={()=> props.navigation.navigate('ProfileView',{latestpr})}>
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
              <Text style={styles.describeStyle}> {latestpr.mission}</Text>
            </View>
          </View>

          <View style={styles.eee}>
            <Text style={styles.headStyle} >보증금</Text>
            <Text style={styles.describeStyle}>실천보증금 {latestpr.deposit}원</Text>
          </View>

          <View style={styles.eee}>
            <Text style={styles.headStyle} >프로젝트 기간</Text>
            <Text style={styles.describeStyle}>{latestpr.duration} DAYS</Text>
          </View>
          </View>
        </ScrollView>
        </Card>
        <View style={styles.buttonStyle}>
          {latestpr.tutor.email === myinfo.email
          ?(
            <View>
              <Button onPress={() => {tutordeleteproject()}}>프로젝트 삭제하기</Button>
            </View>
          )
          :
            (isExperienced ?
              <View>
                { isJoin === false
                  ? (<Button onPress={()=>{handleAttendence()}}>{latestpr.experience_period} DAYS  체험하기</Button> )
                  : (<Button onPress={()=>{tuteequitproject()}}>프로젝트 그만두기</Button> )
                }
              </View>
            :
              <View>
                { isJoin === false 
                  ? (<Button onPress={()=>{
                    //handleAttendence()
                  }}>프로젝트 신청하기</Button> 
                  )
                  :(<Button onPress={()=>{tuteequitproject()}}>프로젝트 그만두기</Button> )
                }
              </View>)
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
