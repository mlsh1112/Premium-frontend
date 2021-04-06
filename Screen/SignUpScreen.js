import React, {Component, useState,createRef,useEffect} from 'react';
import {Button} from '../src/components'
import axios from 'axios'
import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   CheckBox,
   Text,
   Image,
   StatusBar,
   TextInput,
   TouchableOpacity,
 } from 'react-native';
 
import {signup} from '../src/Api';
import {setToken} from '../src/Asyncstorage';
import { Formik } from "formik";
import * as Yup from "yup";
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
  password: Yup.string()
    .required("비밀번호를 입력해주세요"),
  Comfirm_password: Yup.string()
    .required("비밀번호 확인을 입력해주세요")
 });

const SignUp=(props)=>{
  

  var userType;
  const [isSelected,setSelection]=useState(false);

  useEffect(()=>{
    userType=isSelected?"튜터":"튜티"
    console.log(userType);
  })

  const handleSubmitPress = (values)=>{  
    signup({
      "email":values.email,
      "password":values.password,
      "name":"dfdgsfdg",
      "phone":null,
      "user_type":userType
     }
    ).then(res => {
      console.log(res.data.token);
      setToken(res.data.token);
    }).then(() => {
      props.navigation.replace('AuthLoading');
      console.log("Go to Home from sign in ");
    }).catch(error => {
      alert("이메일 혹은 패스워드를 확인해주세요.")
      console.log(error);
    });
  }  

  return(
    <View style={styles.container}>
     <View >
       <Text style={styles.title}>Welcome to 따숲</Text>
     </View>
     <Formik
       style={styles.FormStyle}
       validationSchema={validationSchema}
       initialValues={{ email: '', password: '',Comfirm_password:'', }}
       onSubmit={values => {
         console.log(values)
         handleSubmitPress(values)
       }}
     >
       {({ handleChange, handleBlur, handleSubmit, values, errors,touched,}) => (
       
         <>
           <TextInput
             name="email"
             placeholder="Email Address"
             style={styles.textInput}
             onChangeText={handleChange('email')}
             onBlur={handleBlur('email')}
             value={values.email}
             keyboardType="email-address"
           />
           {(errors.email && touched.email) &&
           <Text style={styles.errorText}>{errors.email}</Text>
           }
           <TextInput
             name="password"
             placeholder="Password"
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
             placeholder="Confirm_Password"
             style={styles.textInput}
             onChangeText={handleChange('Comfirm_password')}
             onBlur={handleBlur('Comfrim_password')}
             value={values.Comfirm_password}
             secureTextEntry
           />
           {(errors.Comfirm_password && touched.Comfirm_password) &&
           <Text style={styles.errorText}>{errors.password}</Text>
           }
           <View>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={styles.lable}>당신은 튜터 입니까?</Text>
           </View>
           <View style={styles.button}>
             <Button onPress={handleSubmit}>Sing Up</Button>
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
});


export default SignUp;
