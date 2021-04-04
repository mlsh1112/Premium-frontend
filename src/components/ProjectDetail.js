import React, { Component } from 'react';
import { StyleSheet, View, Image,Text,TouchableOpacity,ScrollView } from 'react-native';
import {  Card,IconButton,Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../colors';
import {Button} from '../components';

class ProjectDetail extends Component {
  state = { liked: false };

  _toggle = () => {
    let localLiked = this.state.liked;
    // Toggle the state variable liked
    localLiked = !localLiked;
    this.setState({ liked: localLiked });
  };

  render(){  
  return (
      <View style={styles.position}>
        <Card style={styles.cardStyle}>
          <ScrollView>
          <View style={{margin:20}}>
          <Text style={styles.titleStyle}>개념위주의 집중공략으로 수2 마스터하기!</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.subjectStyle}>고등 수학 / 수학</Text>
            <TouchableOpacity style={styles.likeStyle} onPress={()=>this._toggle()}>
            {this.state.liked === false ? (
              <MaterialCommunityIcons name='heart-outline' size={26} color={colors.maincolor}/>
            ) : (
              <MaterialCommunityIcons name='heart' size={26} color={colors.maincolor}/>
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
              <Text style={styles.describeStyle}>개념 위주로 수능특강 수2 공부하기</Text>
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
            <Text style={styles.describeStyle}>실천보증금 10,000원</Text>
          </View>

          <View style={styles.eee}>
            <Text style={styles.headStyle} >프로젝트 기간</Text>
            <Text style={styles.describeStyle}>60 DAYS</Text>
          </View>
          </View>
        </ScrollView>
        </Card>
        <View style={styles.buttonStyle}>
           <Button>프로젝트 시작하기</Button> 
        </View>
      </View>
    );
  }
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
      fontSize:20,
      marginLeft:5
    },
    eee:{
    width: '100%',
    justifyContent: 'space-between',
    borderColor:'#eee',
    borderBottomWidth:3,
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
