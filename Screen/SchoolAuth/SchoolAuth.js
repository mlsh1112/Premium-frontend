import React, { Component,useState } from 'react';
import colors from '../../src/colors';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Alert,
  } from 'react-native';
  
import {Button} from '../../src/components/Button';
import Imagepicker from '../../src/image-picker';
import authrequest from '../../src/Api';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let headers = {
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': ''
  }
}
const PORT = "http://localhost:3000"
console.log(PORT)
const API = axios.create(headers);
API.interceptors.request.use(
    async function (config){
        const token = await AsyncStorage.getItem('token')
        config.headers['Authorization'] = token
        console.log(config)
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
);
const SchoolAuth = (props) => {
    const [imageinfo,setImageinfo] = useState();
    const submitPhoto = () => {
      const formData = new FormData();
      
      formData.append('auth[images_attributes][0][image]', {uri: imageinfo.uri, name: imageinfo.fileName, type: imageinfo.type});
     
      if(imageinfo !== undefined){
          //authrequest(formData).then(res => console.log(res)).catch(error => console.log(error))
          API.post(PORT+"/auths/", formData)
          .then(res => console.log(res))
          .catch(error => console.log(error))  
          Alert.alert("","제출이 완료되었습니다!",[
          { text: "OK", onPress: () => {
              console.log("확인 누름")
              props.navigation.goBack()
            }
          }]
          )
          console.log('사진제출!!')
        }
        else {
            alert('제출하실 사진을 선택해주세요!')
        }
    }
        return (
            <View style={styles.container}>
                
                <View style={styles.ImagepickerStyle}>
                <Text style={styles.info}>공부 하자는 튜터인증을 위해 학교 인증을 진행 하고있습니다. 학교 인증을 위해 학생증과 함께 
자신의 모습이 나오게 사진을 찍어 전송해주세요</Text>
                    <Imagepicker getImage={setImageinfo}/>
                    
                </View>
                <View styles={styles.confirm}>
                    <Button  onPress={submitPhoto}>사진 제출</Button>
                </View>
          </View>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 15,
    },
    ImagepickerStyle: {
        flex: 1,
    },
    info: {
        margin: 10,
        padding: 10,
        textAlign: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
  });

export default SchoolAuth;