import React,{ Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import colors from '../colors'
import cat from '../../assets/cat2.png'

class  ProjectMini extends Component{
  render(){
  return (
    <View>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ProfileDetail')}}>
            <ImageBackground source={cat} style={styles.imgStyle} opacity={0.4} blurRadius={5}>
                <View style={{margin:10}}>
                <Text style={styles.titleStyle}>기출 문제 중심의 반복 학습과 함께하는 확통 정복하기!</Text>
                <Text style={styles.subStyle}>고등 수학 / 수학</Text>
                <Text style={styles.dayStyle}>60 DAYS</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    </View>
  );
  }
};

const styles={
    imgStyle:{
        width:200,
        height:200,
        borderRadius:20,
    },
    titleStyle:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:25

    },
    subStyle:{
        fontWeight:'bold',
        fontSize:18,
        marginBottom:20,
        color:'#2E3E5C'
    },
    dayStyle:{
        fontWeight:'bold',
        fontSize:15,
        color:'#2E3E5C'
    }
}

export default ProjectMini;
