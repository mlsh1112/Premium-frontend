/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from "jwt-decode"
import React from 'react';
import {Button} from '../src/components'
import {
  StyleSheet,
  View,
  Text,
  TextInput,  
} from 'react-native';
import {login} from '../src/Api';
import {setToken,setType,setStatus,setName,setUser} from '../src/Asyncstorage';
import { Formik } from "formik";
import * as Yup from "yup";
import {refresh,logout} from '../src/Api';
import jwtDecode from "jwt-decode";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
  password: Yup.string()
    .required("비밀번호를 입력해주세요")
});

const Signin = (props) => {
 
  const handleSubmitPress = (values) =>{
     login({
       "email":values.email,
       "password":values.password
     }).then(res => {  
        onLoinSuccess(res)                         
     }).then(() => {
       props.navigation.replace('AuthLoading');
       console.log("Go to Home from sign in ");
       
     }).catch(error => {
       alert("이메일 혹은 패스워드를 확인해주세요.")
       console.log(error);
     });
     const onLoinSuccess=(res)=>{
      let decode_token=jwt_decode(res.data.token)
      let decode_token_ToNumber= Number(decode_token.exp)
      let now_time=new Date().getTime()/1000;
      now_time=Math.ceil(now_time)
      setToken(res.data.token);
      setType(res.data.type);
      setStatus(res.data.status);
      setName(res.data.name)
      setUser(res.data)
      setTIMEout(decode_token_ToNumber,now_time)
     }
     const setTIMEout =(decode_token_ToNumber,now_time)=>{
      setTimeout(onSilentRefresh,((decode_token_ToNumber-now_time)-120)*1000)
     }
     const onSilentRefresh =()=>{
       refresh().then(
        async (res)=>{
          await AsyncStorage.removeItem('token');
            setToken(res.data.token);
            let decode_token=jwt_decode(res.data.token)
            let decode_token_ToNumber= Number(decode_token.exp)
            let now_time=new Date().getTime()/1000;
            now_time=Math.ceil(now_time)
            setTIMEout(decode_token_ToNumber,now_time)
          }
       )
       .catch(async(error)=>{
          alert("로그인 만료시간이 다되었습니다. 다시 로그인해주세요");
          console.log(error)  
          await AsyncStorage.removeItem('token');
          props.navigation.replace('Onboarding');
        
       })
     }
     const deletokenfortest = async() => {
       try{
          await AsyncStorage.removeItem('token');
          return true;
      }
      catch (error){
          console.log("AsyncStorage remove Error: " + error.message);
          return false;
        };
  }
  }
   
  return (
   <View style={styles.container}>
     <View >
       <Text style={styles.title}>Welcome to 따숲</Text>
     </View>
     <Formik
       style={styles.FormStyle}
       validationSchema={validationSchema}
       initialValues={{ email: '', password: '' }}
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
           <View style={styles.button}>
             <Button onPress={handleSubmit}>Log in</Button>
           </View>
           <Text style={styles.SignUpQStyle}>따숲이 처음이신가요?</Text>
            <Text style={styles.SignUpStyle}
              onPress={() => props.navigation.navigate("Signup")}
              >
              Sign Up
            </Text>
         </>
       )}
     </Formik>
   </View>
  );
};
 
const styles = StyleSheet.create({
  container : {
      flex : 1,
      justifyContent:'center',
      alignItems:'center',
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
  errorText: {
    fontSize: 12,
    color: 'red',
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
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: 'center',
    marginTop:10,
  },
  SignUpStyle: {
    color: "blue",
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    borderBottomWidth: 1,
    paddingBottom: 1,
    borderBottomColor: "blue",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom:10,
  }
 });
 
 export default Signin;
 