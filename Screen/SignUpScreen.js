import React, {Component, useState,createRef,useEffect} from 'react';
import {Button} from '../src/components'
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
 import CheckBox from '@react-native-community/checkbox';
import icon from '../assets/ddasup_icon.png'
import {Picker} from '@react-native-picker/picker';
import {signup} from '../src/Api';
import { Formik } from "formik";
import * as Yup from "yup";
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
  password: Yup.string()
    .required("비밀번호를 입력해주세요."),
  Comfirm_password: Yup.string()
    .required("비밀번호 확인을 입력해주세요."),
  Phone:Yup.number()
  .integer("숫자만 입력해주세요")
  .min(8)  
  .required("전화번호를 입력해주세요."),

 });

const SignUp=(props)=>{
  

  const [selectedPicker,setSelectedPicker]=useState("은행 선택")
  var userType;
  const [isSelected,setSelection]=useState(false);

  useEffect(()=>{
    userType=isSelected?"Tutor":"Tutee"
    console.log(userType);
  })

  const handleSubmitPress = (values)=>{  
    console.log(values.email)
    signup({
      "email":values.email,
      "password":values.password,
      "name":values.Account_Name,
      "phone":values.Phone,
      "type":userType,
     }
    ).then(() => {
      props.navigation.replace('Signin');
      console.log("Go to Home from sign in ");
    }).catch(error => {
      alert("이미 생성되어 있는 아이디 입니다.")
      console.log(error);
    });
  }  

  return(
    <View style={styles.container}>
     <SafeAreaView>
     <View style={styles.topstyle}>
       <Image source={icon} style={styles.iconstyle}/>
     </View>
     <Formik
       style={styles.FormStyle}
       validationSchema={validationSchema}
       initialValues={{email:'', password:'',Comfirm_password:'',Phone:''}}
       onSubmit={(values) => {
         console.log(values)
         handleSubmit(values)
       }}
     >
       {({ handleChange, handleBlur, handleSubmit, values, errors,touched,}) => (
       <View>   
         <>
         <Text>Enter Your Email</Text>
          <TextInput
             name="email"
             placeholder="     Email Address"
             style={styles.textInput}
             onChangeText={handleChange('email')}
             onBlur={handleBlur('email')}
             value={values.email}
             keyboardType="email-address"
           />
           {(errors.email && touched.email) &&
           <Text style={styles.errorText}>{errors.email}</Text>
           }
           <Text>Enter Your Password</Text>
           <TextInput
             name="password"
             placeholder="     Password"
             style={styles.textInput}
             onChangeText={handleChange('password')}
             onBlur={handleBlur('password')}
             value={values.password}
             secureTextEntry
           />
           {(errors.password && touched.password) &&
           <Text style={styles.errorText}>{errors.password}</Text>
           }
           <Text>Enter Your Email</Text>
           <TextInput
             name="Confirm_password"
             placeholder="     Confirm Password"
             style={styles.textInput}
             onChangeText={handleChange('Comfirm_password')}
             onBlur={handleBlur('Comfirm_password')}
             value={values.Comfirm_password}
             secureTextEntry
           />
           {(errors.Comfirm_password && touched.Comfirm_password) &&
           <Text style={styles.errorText}>{errors.Comfirm_password}</Text>
           }
           <Text>Enter Your Phone Number </Text>
           <TextInput
             name="Phone"
             placeholder="     Please enter only the number without '-'      "
             style={styles.textInput}
             onChangeText={handleChange('Phone')}
             onBlur={handleBlur('Phone')}
             value={values.Phone}
           />
           {(errors.Phone && touched.Phone) &&
           <Text style={styles.errorText}>{errors.Phone}</Text>
           }
               <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
            <Text style={{alignSelf:'center'}}>당신은 튜터 입니까?</Text> 
           
           
           <View style={styles.Button}>
             <Button onPress={handleSubmit}>Sign Up</Button>
           </View>
        
         </>
         </View>
       )}
     </Formik>
     </SafeAreaView>
   </View>
   

  )
}

const styles = StyleSheet.create({
  container : {
      flex : 1,
      justifyContent:'center',
      alignItems:'center',
  },
  iconstyle:{
    width:90,
    height:90
  },
  topstyle:{
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
 
 PickerBox: {
  position:'absolute',
  height: 40,
  width: '35%',
  margin: 10,
  backgroundColor: 'white',
  borderWidth: 1,
  borderRadius: 10,  
},

AccountInput: {
  height: 40,
  width: '55%',
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
  alignSelf:'center'
},
 textInput: {
  height: 50,
  width: '90%',
  margin: 10,
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
 title: {
  fontSize: 36,
  fontWeight: "bold",
  marginBottom:10,
  alignSelf:"center"
},
 checkbox:{
  alignSelf:"center",
},
lable:{
  margin:9,
},
Button:{
  marginTop:10,
  alignSelf:"center"
}
});


export default SignUp;
