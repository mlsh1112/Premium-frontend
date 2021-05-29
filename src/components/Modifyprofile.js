import React, {Component, useState,createRef,useEffect} from 'react';
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

import { Formik } from "formik";
import * as Yup from "yup";

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
  
  const [selectedPicker,setSelectedPicker]=useState("은행 선택")
  var userType;
  const [isSelected,setSelection]=useState(false);

  const handleSubmitPress = ()=>{  
    console.log("개인 정보 수정")
  }  
  useEffect(()=>{
    userType=isSelected?"Tutor":"Tutee"
    console.log(userType);
  })

  return(
    <View style={styles.container}>
     <SafeAreaView>
     <View style={{marginTop:10}}>
       <Text style={styles.title}>개인 정보 수정</Text>
     </View>
     <Formik
       style={styles.FormStyle}
       validationSchema={validationSchema}
       initialValues={{email:'', password:'',Comfirm_password:'',Name:'',Phone:''}}
       onSubmit={(values) => {
         console.log(values)
         handleSubmitPress(values)
       }}
     >
       {({ handleChange, handleBlur, handleSubmit, values, errors,touched,}) => (
       <ScrollView style={{alignSelf:'center'}}>   
         <>
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

           <TextInput
             name="Name"
             placeholder="Name"
             style={styles.textInput}
             onChangeText={handleChange('Name')}
             onBlur={handleBlur('Name')}
             value={values.Name}
           />
           {(errors.Name && touched.Name) &&
           <Text style={styles.errorText}>{errors.Name}</Text>
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
             <Button onPress={handleSubmitPress}>개인 정보 수정 완료</Button>
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


export default Modifyprofile;
