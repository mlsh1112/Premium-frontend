import React, {Component, useState,createRef,useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from '../components/Button'
import axios from 'axios'
import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   SafeAreaView,
   Image,
   StatusBar,
   TextInput,
   TouchableOpacity,
   KeyboardAvoidingView,
 } from 'react-native';
import RNRestart from 'react-native-restart';

import { Formik } from "formik";
import * as Yup from "yup";
import {userUpdate,logout,} from "../Api"
import CheckBox from '@react-native-community/checkbox';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
  password: Yup.string()
    .required("비밀번호를 입력해주세요."),
  Comfirm_password: Yup.string()
    .required("비밀번호 확인을 입력해주세요."),
  Name: Yup.string()
    .required("이름을 입력해주세요."),
  Phone:Yup.number()
  .typeError("슷지만 입력해주세요.")
  .min(11)  
  .required("핸드폰 번호를 입력해주세요."),
  
 });

const Modifyprofile=(props)=>{
  const handleSubmitPress = (values)=>{
    console.log(props.route.params.myinfo.id)
     userUpdate(props.route.params.myinfo.id,
       {
           "user":{
                     "password":values.password,
                     "name":values.Name,
                     "phone":values.Phone
                   }
       }).then(res => {

        logout().then(()=>{
          console.log("로그아웃 성공")
          AsyncStorage.removeItem('token');
          RNRestart.Restart();
          alert("개인 정보 수정 성공");})
       })
       .catch(error => {
         alert("전화번호가 있습니다.")
         console.log(error);
       });
  
  }  

  return(
    <View style={styles.container}>
     <Formik
       style={styles.FormStyle}
       validationSchema={validationSchema}
       initialValues={{ password:'',Comfirm_password:'',Name:'',Phone:''}}
       onSubmit={(values) => {
         console.log(values)
         handleSubmitPress(values)
       }}
     >
       {({ handleChange, handleBlur, handleSubmit, values, errors,touched,}) => (
             <>
       <ScrollView>
         
       <TextInput
             name="Name"
             placeholder="        이름"
             style={styles.textInput}
             onChangeText={handleChange('Name')}
             onBlur={handleBlur('Name')}
             value={values.Name}
           />
           {(errors.Name && touched.Name) &&
           <Text style={styles.errorText}>{errors.Name}</Text>
           }

           <TextInput
             name="password"
             placeholder="        비밀번호"
             style={styles.textInput}
             onChangeText={handleChange('password')}
             onBlur={handleBlur('password')}
             value={values.password}
             secureTextEntry
           />
           {(errors.password && touched.password) &&
           <Text style={styles.errorText}>{errors.password}</Text>
           }
           <TextInput
             name="Confirm_password"
             placeholder="        비밀번호 확인"
             style={styles.textInput}
             onChangeText={handleChange('Comfirm_password')}
             onBlur={handleBlur('Comfirm_password')}
             value={values.Comfirm_password}
             secureTextEntry
           />
           {(errors.Comfirm_password && touched.Comfirm_password) &&
           <Text style={styles.errorText}>{errors.Comfirm_password}</Text>
           }

           <TextInput
             name="Phone"
             placeholder="        전화번호 '-' 없이 입력         "
             style={styles.textInput}
             onChangeText={handleChange('Phone')}
             onBlur={handleBlur('Phone')}
             value={values.Phone}
           />
           {(errors.Phone && touched.Phone) &&
           <Text style={styles.errorText}>{errors.Phone}</Text>
           }
                
         
         </ScrollView>

            <View style={styles.Button}>
            <Button onPress={handleSubmit}>개인 정보 수정 완료</Button>
            </View>
            </>
       )}
     </Formik>
     
   </View>
   

  )
}

const styles = StyleSheet.create({
  container : {
      flex : 1,
      justifyContent:'center',
      alignItems:'center',
      marginTop:50
  },
  FormStyle: {
   height: 40,
   marginTop: 20,
   margin: 10,
 },
errorText: {
  fontSize: 12,
  color: 'red',
  alignSelf:'center'
},
 textInput: {
  height: 50,
  width: 350,
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 10,
  fontSize:15,
  fontWeight:'bold',
  elevation: 5,
  shadowColor: 'gray',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  borderRadius:20 
    
},
 
Button:{
  alignSelf:"center",
  marginBottom:30
}
});


export default Modifyprofile;
