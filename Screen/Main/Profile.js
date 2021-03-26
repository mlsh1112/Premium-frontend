/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import {
   StyleSheet,
   View,
   Image,
   ScrollView,
   TouchableOpacity,
   SafeAreaView, 
   Button,
 } from 'react-native';
 import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../../src/colors'
function PrintProject({project}){
  return(
        <TouchableOpacity style={styles.CardContainer} onPress={()=> console.log(project.id)}>
            <Text style={styles.CardTitle}>{project.title}</Text>
            <Text style={styles.CardContent}>{project.info}</Text>
        </TouchableOpacity>
      );
}
 const Profile = (props) => {
    const [whoami,setWhoami] = useState('tutor');
    const [project,setproject] = useState([{id: 1,title: "수학2 마스터하기", info:"반복학습을 통한 수학2 마스터하기"},
    {id:2,title: "비문학 마스터하기", info:"회독을 통한 비문학 마스터하기"},
    {id:3,title: "국사 마스터하기", info:"중요파트 집중을 통한 국사 마스터하기"}]);
    const [name,setName] = useState('이모씨');
    const [school,setSchool] = useState('아주대학교')
    const [followers,setFollower] = useState(1287)
    const [following,setFollowing] = useState(224)
    //const [form, setValues] = useState({
    //  username: '',
    //  password: ''
    //});
    //const proArray = project;
    const handleLogoutPress = async()=>{
       await AsyncStorage.removeItem('token');
       props.navigation.popToTop()
    }
    
    return (
      <SafeAreaView  style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Text style={styles.avatar} />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 5,
              }]}>{name}</Title>
              <View>
                <Icon name="teach" color="red" size={20}/>
                <Text style={styles.caption,{color:"red"}}>{whoami}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buttonposition} onPress={handleLogoutPress}>
                <Text style={styles.buttonstyle}>로그 아웃</Text>
            </TouchableOpacity>
           
          </View>
          
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="school" color="#777777" size={20} style={{textAlignVertical:'center'}}/>
            <Text style={{color:"#777777", marginLeft: 20,textAlignVertical:'center'}}>{school}</Text>
          </View>
          <TouchableOpacity style={styles.buttonposition_createpro} onPress={()=>console.log("create project")}>
                <Text style={styles.buttonstyle}>프로젝트 생성</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={styles.infoBox}>
            <Title>{project.length}</Title>
            <Caption>Projects</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{following}</Title>
            <Caption>Following</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{followers}</Title>
            <Caption>Followers</Caption>
          </View>
        </View>

        <View style={styles.menuItem}>
          <Icon name="book" color="black" size={25}/>
          <Text style={styles.menuItemText}>Projects</Text>
        </View>
        <ScrollView style={styles.menuWrapper}>
            <View>
              {project.map(pr => {
                return <PrintProject project={pr} key={pr.id}/>
              })}  
            </View>
        </ScrollView>
      </SafeAreaView >
    );
  };
  
  const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginTop: 10,
      marginBottom: 10,
      alignContent: 'center',
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
      textAlign: 'center',
      textAlignVertical: "center",
      borderRadius: 50,
    },
    CardContainer: {
      padding: 20,
      elevation: 5,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      margin: 20,
      elevation: 5
  },
  CardTitle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 20,
      padding: 3
  },
  CardContent: {
      width: '100%',
      fontSize: 12,
      padding: 3
  },
  buttonposition:{
    width: 100,
    height: 30,
    backgroundColor: colors.maincolor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    marginTop: 30,
    position: 'absolute',
    right: 10,
    textAlignVertical: 'top',
    bottom: 10
  },
  buttonstyle:{
      color:'white',
      fontWeight: 'bold',
      fontSize: 18,
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
  