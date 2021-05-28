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
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions, 
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {TabView, TabBar} from 'react-native-tab-view';

import colors from '../../src/colors'
import {logout,getcurrentuser,getattendances,tutorgetproject,getmylikes} from '../../src/Api';
import ProjectMini from '../../src/components/ProjectMini';
import cat from '../../assets/cat2.png'

const EachTabViewsProjects = (props) => {
  return(
    <ScrollView style={styles.menuWrapper}>
            <View style={{marginRight:-20, flex:1,flexDirection:'row',justifyContent:'space-between',flexWrap: 'wrap'}}>
              {props.project.map((pr, index )=> {
                if (props.usertype === 'Tutor'){
                  return(
                    <View key={index} style={{marginVertical:8}}>
                      <ProjectMini navigation={props.navigation} project={pr} key={index}></ProjectMini>
                    </View>
                  )
                }else {
                  return(
                    <View key={index} style={{marginVertical:8}}>
                      <ProjectMini navigation={props.navigation} project={pr.project} key={index}></ProjectMini>
                    </View>
                  )
                }
              })}  
            </View>
            
    </ScrollView>
  );
}

const Profile = (props) => {
  const [myinfo,setMyinfo] = useState(
    {
      "email": "", "id": -1, "image": "", "info": "", "likes_count": -1, "name": "", "phone": "", "status": "", "type": ""
    }
  )
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
            // getmylikes().then(res =>{
            //   console.log(res.data)
            //   mylikelists.current = res.data
            // }).catch(e => {
            //   console.log(e)
            // })
            setMylikelists([{name:'노근탁'},{name: '이혜민'},{name:'호호호'}])
            setProject(res.data)
          }).catch(e => {
            console.log('-----------------get attendance error----------------')
            console.log(e.response.status)
          })
        }
        else {
          tutorgetproject({
            q: {tutor_id_eq: res.data.id}
          }).then(res => {
            console.log(res.data)
            setProject(res.data)
          }).catch(e => {
            console.log("=======get tutor project error========")
            console.log(e.response.status)
          })
        }
        showscreen.current = true
      }).catch(e => {
        console.log(e)
        alert('get user info error!!')
      })
    })
  },[props.navigation])
  
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '진행 중' },
    { key: 'second', title: '완료' },
  ]);
  const renderTabBar = (props) => {
    return(<TabBar
      {...props}
      activeColor={colors.maincolor}
      inactiveColor={"black"}
      style={{backgroundColor:''}}
      indicatorStyle={{backgroundColor:colors.maincolor}}
    />);
  }
  const renderScene = ({route}) =>{
    switch (route.key) {
      case 'first':
        return <EachTabViewsProjects project={project} navigation={props.navigation} usertype={myinfo.type}/>;
      case 'second':
        return <EachTabViewsProjects project={finishedproject} navigation={props.navigation} usertype={myinfo.type}/>
    }
  };
  
  const handleLogoutPress = ()=> {  //로그아웃 function
    console.log('로그아웃 버튼 눌림!')
    logout().then(res => {
      console.log(res)
      AsyncStorage.removeItem('token');
      props.navigation.popToTop()
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
              <TouchableOpacity style={styles.buttonposition} onPress={gotoChatroom}>
                  <Text style={styles.buttonstyle}>채팅방</Text>
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
  menuWrapper: {
    padding: 10,
    width: "100%",
    marginTop: 5,

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
});
  
export default Profile;
  