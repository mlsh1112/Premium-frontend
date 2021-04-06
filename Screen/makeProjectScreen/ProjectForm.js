import React, { Component,useState } from 'react';
import colors from '../../src/colors';
import {Button} from '../../src/components'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    ScrollView,
  } from 'react-native';
import { Formik } from "formik";
import * as Yup from "yup";
import RNDateTimePicker from '@react-native-community/datetimepicker'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const validationSchema = Yup.object().shape({
    title: Yup.string().min(5,"프로젝트 명이 너무 짧습니다.(최소 5글자 최대 30글자)").max(30,"프로젝트 명이 너무 깁니다.(최소 2글자 최대 30글자)").required("프로젝트 이름을 입력해주세요."),
    startDate: Yup.date().nullable().min(new Date()).required("프로젝트 시작 날짜를 기입해주세요."),
    duration: Yup.number().min(10,"프로젝트 최소 기간은 10일 이상입니다.").required("올바른 프로젝트 기간을 정수 값으로 입력해주세요"),
    dailyStudyTime: Yup.number().min(0,"일일 최소학습 시간을 설정해주세요.").required("일일 최소학습 시간을 기입해주세요"),
    howToAuth: Yup.string().min(5,"인증 방식을 올바르게 기입해주세요.").required("프로젝트 인증 방식을 기입해주세요."),
    projectIntroduce: Yup.string().min(5,"프로젝트 소개를 올바르게 기입해주세요.").required("프로젝트 소개를 올바르게 기입해주세요."),
  });

const ProjectForm =()=> {
    const [isDateTimePickerVisible,setIsDateTimePickerVisible] = useState(false)
    const handleSubmitPress = (values) =>{
        console.log("프로젝트 제출 : " + JSON.stringify(values))
     }
     const [date,setDate ] = useState(new Date())
    return (
        <ScrollView>
        <View style={styles.container}>
            <Formik
              style={styles.FormStyle}
              validationSchema={validationSchema}
              initialValues={{ title: '',startDate: new Date(), duration: '',dailyStudyTime: '',howToAuth:'',projectIntroduce:''}}
              onSubmit={values => {   
                handleSubmitPress(values)
              }}
            >
              {({ handleChange, handleBlur, handleSubmit,setFieldValue, values, errors,touched,}) => (
              
                <>
                <Text style={styles.subtitle}>1. 프로젝트 이름</Text>
                  <TextInput
                    name="title"
                    placeholder="프로젝트 이름을 입력해주세요"
                    style={styles.textInput}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                  />
                  {(errors.title && touched.title) &&
                  <Text style={styles.errorText}>{errors.title}</Text>
                  }
                  <Text style={styles.subtitle}>2. 프로젝트 시작 일자</Text>
                  <TextInput
                    name="startDate"
                    placeholder="YYYY-MM-DD"
                    style={styles.textInput}
                    value={date.toISOString().substring(0,10)}
                    onChangeText={(e)=>{
                        handleChange(e)
                        values.startDate = new Date(date)
                    }}
                  />
                  {isDateTimePickerVisible && (
                      <RNDateTimePicker
                        style={{width: 320, backgroundColor: "white"}}
                        value={new Date()}
                        onChange={(event,selectedDate)=> {
                            setIsDateTimePickerVisible(false)
                            setDate(selectedDate)
                            
                            setFieldValue('startDate',selectedDate)
                            //console.log("selected is "+current)
                        }}
                      />
                  )}
                  <TouchableOpacity style={{position:"relative",bottom:43, left: 140}} onPress={()=>setIsDateTimePickerVisible(true)}>
                    <Icon name="calendar" color="#777777" size={24} style={{textAlignVertical:'center'}}/>
                  </TouchableOpacity>
                  {(errors.startDate && touched.startDate) &&
                  <Text style={styles.errorText}>{errors.startDate}</Text>
                  }
                  <Text style={styles.subtitle}>3. 프로젝트 기간</Text>
                  <TextInput
                    name="duration"
                    placeholder="프로젝트 기간 입력(단위: 일)"
                    style={styles.textInput}
                    onChangeText={value => {
                        console.log(value)
                        const parsedvalue = parseInt(value)
                        if (!isNaN(parsedvalue)){
                            console.log(parsedvalue)
                            setFieldValue('duration',parsedvalue,10);
                        }
                        else {
                            values.duration =''
                            console.log("string is typed")
                        }
                    }}
                    onBlur={handleBlur('duration')}
                    keyboardType='numeric'
                  />
                  {(errors.duration && touched.duration) &&
                  <Text style={styles.errorText}>{errors.duration}</Text>
                  }
                  <Text style={styles.subtitle}>4. 최소 학습시간</Text>
                  <TextInput
                    name="dailyStudyTime"
                    placeholder="최소 학습시간 입력(단위: 분)"
                    style={styles.textInput}
                    onChangeText={value => {
                        console.log(value)
                        const parsedvalue = parseInt(value)
                        if (!isNaN(parsedvalue)){
                            console.log(parsedvalue)
                            setFieldValue('dailyStudyTime',parsedvalue,10);
                        }
                        else {
                            values.dailyStudyTime =''
                            console.log("string is typed")
                        }
                    }}
                    onBlur={handleBlur('dailyStudyTime')}
                    keyboardType='numeric'
                  />
                  {(errors.dailyStudyTime && touched.dailyStudyTime) &&
                  <Text style={styles.errorText}>{errors.dailyStudyTime}</Text>
                  }
                  <Text style={styles.subtitle}>5. 프로젝트 인증 방식</Text>
                  <TextInput
                    name="howToAuth"
                    placeholder="프로젝트 일일 인증 방식을 입력해주세요"
                    style={styles.bigtextInput}
                    onChangeText={handleChange('howToAuth')}
                    onBlur={handleBlur('howToAuth')}
                    value={values.howToAuth}
                    multiline={true}
                  />
                  {(errors.howToAuth && touched.howToAuth) &&
                  <Text style={styles.errorText}>{errors.howToAuth}</Text>
                  }
                  <Text style={styles.subtitle}>6. 프로젝트 소개</Text>
                  <TextInput
                    name="projectIntroduce"
                    placeholder="프로젝트 소개를 입력해주세요"
                    style={styles.bigtextInput}
                    onChangeText={handleChange('projectIntroduce')}
                    onBlur={handleBlur('projectIntroduce')}
                    value={values.projectIntroduce}
                    multiline={true}
                  />
                  {(errors.projectIntroduce && touched.projectIntroduce) &&
                  <Text style={styles.errorText}>{errors.projectIntroduce}</Text>
                  }
                  <View style={styles.button}>
                    <Button onPress={handleSubmit}>프로젝트 생성하기</Button>
                  </View>
                </>
              )}
            </Formik>
        </View>
        </ScrollView>
        );

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
        margin: 10,
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
    bigtextInput: {
        height: 100,
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
    button: {
      marginTop: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      marginBottom:10,
    },
    subtitle: {
        width: "90%",
        fontWeight:"bold",
        fontSize: 18,
    }
  });

export default ProjectForm;
