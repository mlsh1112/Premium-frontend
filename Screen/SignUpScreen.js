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
  Picker,
   TextInput,
   TouchableOpacity,
   KeyboardAvoidingView,
 } from 'react-native';
 import CheckBox from '@react-native-community/checkbox';

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
  Banck:Yup.string()
    .required("은행이름을 입력해주세요."),
  Account_Number: Yup.string()
    .required("환불 받으실 계좌번호를 입력해주세요."),
  Account_Name: Yup.string()
    .required("환불 받으실 계좌주를 입력해주세요."),
  Phone:Yup.number()
  .integer("숫자만 입력해주세요")
  .min(8)  
  .required("환불 받으실 계좌주를 입력해주세요."),

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
     <View style={{marginTop:10}}>
       <Text style={styles.title}>Welcome to 따숲</Text>
     </View>
     <Formik
       style={styles.FormStyle}
       validationSchema={validationSchema}
       initialValues={{email:'', password:'',Comfirm_password:'',Account_Number:'',Account_Name:'',Phone:''}}
       onSubmit={(values) => {
         console.log(values)
         handleSubmitPress(values)
       }}
     >
       {({ handleChange, handleBlur, handleSubmit, values, errors,touched,}) => (
       <ScrollView>   
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
             onBlur={handleBlur('Comfirm_password')}
             value={values.Comfirm_password}
             secureTextEntry
           />
           {(errors.Comfirm_password && touched.Comfirm_password) &&
           <Text style={styles.errorText}>{errors.Comfirm_password}</Text>
           }

           <View style={{width:'95%',flexDirection:'row'}}>
           <View style={styles.PickerBox}/>
           
              <Picker
                style={{marginTop:5,marginLeft:5, width:'40%'}}
                selectedValue={selectedPicker}
               onValueChange={(itemValue,itemIndex)=>
               setSelectedPicker(itemValue)}
              >
                <Picker.Item label="선택" value="선택" color='grey'/> 
                <Picker.Item label="국민" value="국민"/>
                <Picker.Item label="신한" value="신한"/>
                <Picker.Item label="기업" value="기업"/>
                <Picker.Item label="농협" value="농협"/>
            
            </Picker>
            
           <TextInput
              name="Account_Number"
              placeholder="Account_Number"
              style={styles.AccountInput}
              onChangeText={handleChange('Account_Number')}
              onBlur={handleBlur('Account_Number')}
              value={values.Account_Number}
             
           />
           </View>
           {(errors.Account_Number && touched.Account_Number) &&
           <Text style={styles.errorText}>{errors.Account_Number}</Text>
           }
           <TextInput
             name="Account_Name"
             placeholder="Account_Name"
             style={styles.textInput}
             onChangeText={handleChange('Account_Name')}
             onBlur={handleBlur('Account_Name')}
             value={values.Account_Name}
           />
           {(errors.Account_Name && touched.Account_Name) &&
           <Text style={styles.errorText}>{errors.Account_Name}</Text>
           }
           <TextInput
             name="Phone"
             placeholder="Please enter only the number without '-' "
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
             <Button onPress={()=>{handleSubmitPress(values)}}>Sign Up</Button>
           </View>
        
         </>
         </ScrollView>
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
  height: 40,
  width: '90%',
  margin: 10,
  backgroundColor: 'white',
  borderWidth: 1,
  borderRadius: 10,
  fontSize:15,
  fontWeight:'bold'
    
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
