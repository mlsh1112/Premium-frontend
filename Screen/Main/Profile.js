/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect, useRef} from 'react';
import RNRestart from 'react-native-restart';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions, 
} from 'react-native';
import {
  Title,
  Caption,
  Text,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {TabView} from 'react-native-tab-view';
import colors from '../../src/colors'
import {logout,getcurrentuser,getattendances,tutorgetproject,getlikes} from '../../src/Api';
import cat from '../../assets/cat2.png'
import {EachTabViewsProjects,renderTabBar} from '../../src/utils/EachTab'

const Profile = (props) => {
  const [myinfo,setMyinfo] = useState({"email": "", "id": -1, "image": "", "info": "", "likes_count": -1, "name": "", "phone": "", "status": "", "type": ""})
  const showscreen = useRef(false)
  const [project,setProject] = useState([])
  const [finishedproject,setFinishedProject] = useState([]);
  const [school,setSchool] = useState('아주대학교');
  const [mylikelists,setMylikelists] = useState([])
  
  useEffect(() => {
    const rerender = props.navigation.addListener('focus', e => {
      console.log("welcome back")
      getcurrentuser().then(res => {
        setMyinfo(res.data)
        if(res.data.type ==='Tutee'){
          getattendances().then(res => {
            getlikes().then(res => {
              console.log(res.data)
              setMylikelists(res.data)
            }).catch(e=>{
                console.log(e)
            })
            // getmylikes().then(res =>{
              // console.log('tutee get their like list complete')
              // console.log(res.data)
              // setMylikelists(res.data)
            // }).catch(e => {
              // console.log(e)
            // })
            setProject(res.data)
          }).catch(e => {
            console.log('-----------------get attendance error----------------')
            console.log(e)
          })
        }
        else {
          tutorgetproject({
            q: {tutor_id_eq: res.data.id}
          }).then(res => {
            console.log('tutor get project list complete')
            setProject(res.data)
          }).catch(e => {
            console.log("=======get tutor project error========")
            console.log(e)
          })
        }
        showscreen.current = true
      }).catch(e => {
        console.log(e)
        alert('get user info error!!')
      })
    })
    return rerender
  },[props.navigation])
  
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '진행 중' },
    { key: 'second', title: '완료' },
  ]);

  const renderScene = ({route}) =>{
    switch (route.key) {
      case 'first':
        return <EachTabViewsProjects project={project} navigation={props.navigation} usertype={myinfo.type}/>;
      case 'second':
        return <EachTabViewsProjects project={finishedproject} navigation={props.navigation} usertype={myinfo.type}/>
    }
  };

  const handleChangeProfile=()=>{
    props.navigation.navigate('Modifyprofile',{myinfo});
    
  }
  
  const handleLogoutPress = ()=> {  //로그아웃 function
    console.log('로그아웃 버튼 눌림!')
    logout().then(res => {
      console.log('로그아웃 성공!!!')
      AsyncStorage.removeItem('token');
      RNRestart.Restart();
          
    }).catch(e => {
      console.log('================== 로그아웃 에러 ==================')
      console.log(e.response)
    })
  }
  const gotoChatroom = () => {
    console.log('채팅룸 입장')
    // console.log(project)
    if (myinfo.type === 'Tutee'){
      props.navigation.navigate('Chatroom',{myinfo,latestpr:project})
    }else{
      props.navigation.navigate('Chatroom',{myinfo,latestpr:project})
    }
  }
  const goToCreateProject = () => {
    console.log("프로젝트 생성하러가기");
    props.navigation.navigate('ProjectForm');
  }
  const goToAuth = () => {
    console.log("인증하러 하러가기");
    if(myinfo.type == 'Tutor'){
      props.navigation.navigate('SchoolAuth');
    }
    else if(myinfo.type == 'Tutee'){
      props.navigation.navigate('Authentication')
    }
    else {
      console.log("check userinfo type!!!!")
    }
  }
  return (
    <SafeAreaView style={styles.container}>
    {showscreen && (
        <View style={{flexDirection:'row',marginTop:30,paddingHorizontal:20}}>
          <View style={{width: '30%',justifyContent:'center',alignItems:'flex-start'}}>
            <Image source={cat} style={styles.avatar} />
          </View>
          <View style={{width:'70%'}}>
            <View style={[styles.userinfoWrapper,{height:50}]}>
              <Text style={{fontSize:20,fontWeight:'bold'}}>{myinfo.name}</Text>
              <TouchableOpacity style={styles.buttonposition} onPress={handleChangeProfile}>
                  <Text style={[styles.buttonstyle,{fontSize: 14}]}>개인 정보 수정</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userinfoWrapper}>
              { myinfo.type === "Tutor"
                ? (<View>
                    <Icon name="teach" color="#F63D3D" size={20}/>
                    <Text style={styles.caption,{color:"#F63D3D"}}>{myinfo.type}</Text>
                    <Text style={styles.caption,{color:"#F48705"}}>[ {myinfo.status} ]</Text>
                  </View>
                  )
                : (<View>
                    <View style={{flexDirection:'row'}}>
                      <Icon name="book-open-variant" color="#7EB3D9" size={20}/>
                      <Icon name="human-child" color="#7EB3D9" size={20}/>
                    </View>
                    <Text style={styles.caption,{color:"#7EB3D9"}}>{myinfo.type}</Text>
                  </View>
                  )
              }
              <TouchableOpacity style={styles.buttonposition} onPress={handleLogoutPress}>
                  <Text style={styles.buttonstyle}>로그 아웃</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <TouchableOpacity style={{
            backgroundColor: colors.maincolor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 32,
            marginTop: 30,
            width: 100,
            height:30,
            marginBottom:50,
            marginLeft:5
            }} onPress={handleChangeProfile}>
            <Text style={styles.modifybuttonstyle}>개인 정보 수정</Text>
          </TouchableOpacity> */}
        </View>
    )}
    
    {showscreen && (
        <View style={{height: 30,flexDirection: 'row',justifyContent:'space-between',paddingHorizontal: 20,marginTop:10}}>
          <View style={{flexDirection:'row'}}>
            <Icon name="school" color="#777777" size={20} style={{textAlignVertical:'center', marginLeft: 10}}/>
            <Text style={{color:"#777777", marginLeft: 10,textAlignVertical:'center'}}>{school}</Text>
          </View>
          { myinfo.type === "Tutor" && myinfo.status === "approved"
            ? (<TouchableOpacity style={[styles.buttonposition,{width: 140,}]} onPress={goToCreateProject}>
                <Text style={styles.buttonstyle}>프로젝트 생성</Text>
               </TouchableOpacity>)
            : (<TouchableOpacity style={[styles.buttonposition,{width: 140,}]} onPress={goToAuth}>
                <Text style={styles.buttonstyle}>인증하러가기</Text>
               </TouchableOpacity>)}
        </View>
     
    )}

    {showscreen && (
      <View style={styles.infoBoxWrapper}>
        <View style={styles.infoBox}>
          <Title>{project.length}</Title>
          <Caption>진행중인 프로젝트</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{finishedproject.length}</Title>
          <Caption>완료한 프로젝트</Caption>
        </View>   
        
        {
          myinfo.type === 'Tutor'
          ? <View style={styles.infoBox}>
              <Title>{myinfo.likes_count}</Title>
              <Caption>좋아요 개수</Caption>
            </View>
          : 
            <TouchableOpacity style={styles.infoBox} onPress={() => props.navigation.navigate('MyLike',{mylikelists})}>
                <Title>{mylikelists.length}</Title>
                <Caption>좋아요 개수</Caption>
            </TouchableOpacity>
        }
        
      </View>
    )}
    
    {showscreen && (
      <View style={styles.menuItem}>
        <Icon name="book" color="black" size={25}/>
        <Text style={styles.menuItemText}>Projects</Text>
      </View>
    )}
    
    {showscreen && (
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    )}
    </SafeAreaView >
  );
};
 
const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  userinfoWrapper: {
    flexDirection:'row', 
    justifyContent:'space-between',
    alignItems: 'center'
  },
  infoBoxWrapper: {
    justifyContent: "space-around",
    alignContent: "center",
    flexDirection: 'row',
    height: 100,
  },
  row: {
    height: 30,
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    borderTopWidth: 3,
    borderTopColor: '#dddddd',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 26,
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 50,
  },
  
  buttonposition:{
    width: 100,
    height: 30,
    backgroundColor: colors.maincolor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    
  },
  buttonstyle:{
      color:'white',
      fontWeight: 'bold',
      fontSize: 18,
  },
  modifybuttonstyle:{
    color:'white',
    fontWeight: 'bold',
    fontSize: 12,
},
  buttonposition_createpro:{
    width: 140,
    height: 30,
    backgroundColor: colors.maincolor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    position: 'absolute',
    right: 40,
  }
});
  
export default Profile;
  