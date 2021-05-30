import React, { useState,useEffect} from 'react';
import {Button} from '../../src/components'
import {
   StyleSheet,
   View,
   Text,
   TextInput,
 } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {userUpdate} from '../../src/Api';
import { Formik } from "formik";
import * as Yup from "yup";
var phoneRegExp = /^\(?([0-1]{3})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/;
const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().matches(phoneRegExp, '올바른 전화번호를 입력해주세요.').required('전화번호를 입력해주세요.')
 });

const KakaoAdditionalInfo=(props)=>{
  var userType;
  const [isSelected,setSelection]=useState(false);
  console.log(props.route.params.userinfo)
  useEffect(()=>{
    userType=isSelected?"Tutor":"Tutee"
    console.log(userType);
  })

  const handleSubmitPress = (values)=>{  
    console.log(values)
    console.log(userType)
    userUpdate(props.route.params.userinfo.id,
      {
          "user":{
                    "phone":values.phoneNumber,
                    "type":userType
                  }
      }).then(res => {
        console.log(res.data.token);
        //setToken(res.data.token);
      }).then(() => {
        console.log('update success')
        props.navigation.replace('Main');
      }).catch(error => {
        alert("이메일 혹은 패스워드를 확인해주세요.")
        console.log(error);
      });
  }  

  return(
    <View style={styles.container}>
     <View >
       <Text style={styles.title}>회원 가입을 위한 추가정보를 입력해주세요</Text>
     </View>
     <Formik
       style={styles.FormStyle}
       validationSchema={validationSchema}
       initialValues={{ phoneNumber: '' }}
       onSubmit={values => {
         //console.log(values)
         handleSubmitPress(values)
       }}
     >
       {({ handleChange, handleBlur, handleSubmit, values, errors,touched,}) => (
       
         <>
           <Text style={styles.subtitle}>1. 전화 번호</Text>
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
  FormStyle: {
   flexDirection: 'row',
   height: 40,
   marginTop: 20,
   marginLeft: 35,
   marginRight: 35,
   margin: 10,
 },
  checkbox:{
    alignSelf:"center",
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


export default KakaoAdditionalInfo;