import React, {Component, useState,createRef,useEffect} from 'react';
import {Button} from '../src/components'
import axios from 'axios'
import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   StatusBar,
   TextInput,
   TouchableOpacity,
 } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {signup} from '../src/Api';
import {setToken} from '../src/Asyncstorage';
import { Formik } from "formik";
import * as Yup from "yup";
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

var phoneRegExp = /^\(?([0-1]{3})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/;
const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().matches(phoneRegExp, '올바른 전화번호를 입력해주세요.').required('전화번호를 입력해주세요.')
 });

const AdditionalInfo=(props)=>{
  var userName=props.route.params.user_name
  var userType;
  const [isSelected,setSelection]=useState(false);

  useEffect(()=>{
    userType=isSelected?"튜터":"튜티"
    console.log(userType);
  })

  const handleSubmitPress = (values)=>{  
    console.log(values)
    console.log(userType)
    //signup({
    //  "phone": values.phoneNumber,
    //  "user_type":userType
    // }
    //).then(res => {
    //  console.log(res.data.token);
    //  setToken(res.data.token);
    //}).then(() => {
    //  props.navigation.replace('AuthLoading');
    //}).catch(error => {
    //  alert("이메일 혹은 패스워드를 확인해주세요.")
    //  console.log(error);
    //});
    props.navigation.replace('Main')
  }  

  return(
    <View style={styles.container}>
     <View >
       <Text style={styles.title}>회원 가입을 위한 추가정보를 입력해주세요</Text>
       <Text style={styles.title}>이름 : {userName}</Text>
     </View>
     <Formik
       style={styles.FormStyle}
       validationSchema={validationSchema}
       initialValues={{ userName:'',phoneNumber: '' }}
       onSubmit={values => {
         //console.log(values)
         handleSubmitPress(values)
       }}
     >
       {({ handleChange, handleBlur, handleSubmit, values, errors,touched,}) => (
       
         <>
          <Text style={styles.subtitle}>1. 이름</Text>
           <TextInput
             name="user-name"
             placeholder={userName}
             style={styles.textInput}
             onChangeText={handleChange('userName')}
             onBlur={handleBlur('userName')}
             value={values.userName}
           />
           <Text style={styles.subtitle}>2. 전화 번호</Text>
           <TextInput
             name="phone-number"
             placeholder="010-XXXX-XXXX"
             style={styles.textInput}
             onChangeText={handleChange('phoneNumber')}
             onBlur={handleBlur('phoneNumber')}
             value={values.phoneNumber}
             keyboardType="number-pad"
           />
           {(errors.phoneNumber && touched.phoneNumber) &&
           <Text style={styles.errorText}>{errors.phoneNumber}</Text>
           }
           
           <View>
              <Text style={styles.subtitle}>당신은 튜터 입니까?</Text>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
           </View>
           <View style={styles.button}>
             <Button onPress={handleSubmit}>추가 정보 기입 완료하기</Button>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom:10,
  },
  textstyle:{
    fontSize:20,
    fontWeight:'bold'
  },
  FormStyle: {
   flexDirection: 'row',
   height: 40,
   marginTop: 20,
   marginLeft: 35,
   marginRight: 35,
   margin: 10,
 },
  InputStyle: {
   flex: 1,
   color: "black",
   paddingLeft: 15,
   paddingRight: 15,
   borderWidth: 1,
   borderRadius: 30,
   borderColor: '#dadae8',
 },
 SignUpQStyle: {
   color: "black",
   textAlign: 'center',
   fontSize: 14,
   alignSelf: 'center',
   padding: 10,
 },
 SignUpStyle: {
   color: "blue",
   textAlign: 'center',
   fontWeight: 'bold',
   fontSize: 14,
   alignSelf: 'center',
   padding: 5,
 },
 checkbox:{
  alignSelf:"center",
},
lable:{
  margin:9,
},
errorText: {
    fontSize: 12,
    color: 'red',
  },
  textInput: {
    height: 40,
    width: '90%',
    margin: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    fontSize:15,
    fontWeight:'bold'
  },
  subtitle: {
    width: "90%",
    fontWeight:"bold",
    fontSize: 18,
}
});


export default AdditionalInfo;