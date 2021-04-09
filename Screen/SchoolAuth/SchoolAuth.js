import React, { Component,useState } from 'react';
import colors from '../../src/colors';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
  } from 'react-native';
  
import {Button} from '../../src/components/Button';
import Imagepicker from '../../src/image-picker';

const SchoolAuth = (props) => {
    const [imageinfo,setImageinfo] = useState();
    const submitPhoto = () => {
        if(imageinfo !== undefined){
            console.log(imageinfo.uri)
            console.log(imageinfo.type)
            console.log(imageinfo.fileName)
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