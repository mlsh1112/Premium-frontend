import React, { useContext,useState } from 'react';
import colors from '../../src/colors';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Alert,
  } from 'react-native';
  
import {Button} from './Button';
import Imagepicker from '../image-picker';
import {userUpdate} from '../Api';
import LoadingModal from './LoadingModal'
import {CurrentUser} from '../utils/CurrentUser'
const UserProfileUpload = (props) => {
    const [myinfo,setMyinfo] = useContext(CurrentUser)
    const [imageinfo,setImageinfo] = useState();
    const [modalVisible,setModalVisible] = useState(false)
    const submitPhoto = () => {
      const formData = new FormData();
      
      formData.append('auth[images_attributes][0][image]', {uri: imageinfo.uri, name: imageinfo.fileName, type: imageinfo.type});
     
      if(imageinfo !== undefined){
          setModalVisible(true)
          userUpdate(myinfo.id,
            {
                "user":{
                          "image":formData,
                        }
            }).then(res => {
              console.log(res.data.token);
              setModalVisible(false)
              Alert.alert("","제출이 완료되었습니다!",[
                        { text: "OK", onPress: () => {
                            console.log("확인 누름")
                            props.navigation.goBack()
                        }
                    }]
                )
              //setToken(res.data.token);
            }).catch(error => {
              alert("이메일 혹은 패스워드를 확인해주세요.")
              console.log(error);
            });
        //   submitauth(formData).then(res => {
        //     console.log(res)
        //     setModalVisible(false)
        //     Alert.alert("","제출이 완료되었습니다!",[
        //       { text: "OK", onPress: () => {
        //           console.log("확인 누름")
        //           props.navigation.goBack()
        //         }
        //       }]
        //       )
        //   }).catch(error => console.log(error.response.data))  
          console.log('사진제출!!')
        }
        else {
            alert('제출하실 사진을 선택해주세요!')
        }
    }
        return (
            <View style={styles.container}>
                
                <View style={styles.ImagepickerStyle}>
                <Text style={styles.info}>프로필 사진을 업로드해주세요!</Text>
                    <Imagepicker getImage={setImageinfo}/>
                </View>
                <View styles={styles.confirm}>
                    <Button  onPress={submitPhoto}>사진 제출</Button>
                </View>
                <LoadingModal visible={modalVisible}/>
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

export default UserProfileUpload;