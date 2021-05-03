import React, { useState } from 'react';
import {Button} from '../../src/components'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    Keyboard,
  } from 'react-native';
import { Formik } from "formik";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import {Schema, InitValue,tommorow} from './ValueSchema';
import {HelpMessage,RenderHelp} from './Help';
import {RenderError} from './ValidMessage';


const ProjectForm =(props)=> {
    const validationSchema = Schema
    const [isDateTimePickerVisible,setIsDateTimePickerVisible] = useState(false)
    const [category,setCategory] = useState([
      {label:"국어",value: "국어", },
      {label:"수학",value: "수학", },
      {label:"영어",value: "영어", }
    ])
    const [categoryid,setCategoryid] = useState('')
    const [date,setDate ] = useState(new Date())
    
    const handleSubmitPress = (values) =>{
      console.log("프로젝트 제출 : " + JSON.stringify(values))
      props.navigation.navigate("Book")
    }
    
    return (
        <ScrollView>
        <View style={styles.container}>
            <Formik
              style={styles.FormStyle}
              validationSchema={validationSchema}
              initialValues={InitValue}
              onSubmit={values => {   
                //console.log(values)
                handleSubmitPress(values)
              }}
            >
              {({ handleChange, handleBlur, handleSubmit,setFieldValue, values, errors,touched,}) => (
              
                <>
                <Text style={styles.subtitle}>0. 프로젝트 카테고리 </Text>
                  <View style={styles.pickerstyle}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => {
                          setCategoryid(value)
                          setFieldValue('categoryid',value)
                        }}
                        items={category}
                        placeholder={{
                          label: '인증할 프로젝트를 선택하세요',
                          value: '',
                        }}>
                        <Text>{categoryid}</Text>
                    </RNPickerSelect>
                  </View>  
                <RenderError errors={errors.categoryid} touched={touched.categoryid} />
                
                <Text style={styles.subtitle}>1. 프로젝트 이름</Text>
                  <TextInput
                    name="title"
                    placeholder="프로젝트 이름을 입력해주세요"
                    style={styles.textInput}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                  />
                <RenderError errors={errors.title} touched={touched.title} />
                

                <Text style={styles.subtitle}>2. 프로젝트 시작 일자</Text>
                  <TextInput
                    name="startDate"
                    style={styles.textInput}
                    value={date.toISOString().substring(0,10)}
                    onChangeText={handleChange}
                    onFocus={()=>{
                      Keyboard.dismiss()
                      setIsDateTimePickerVisible(true)
                      }
                    }
                  />
                  {isDateTimePickerVisible && (
                      <RNDateTimePicker
                        style={{width: 320, backgroundColor: "white"}}
                        value={new Date()}
                        minimumDate={tommorow}
                        onChange={(event,selectedDate)=> {
                          console.log(event)
                          if (event.type === 'set'){
                            setIsDateTimePickerVisible(false)
                            setDate(selectedDate)
                            setFieldValue('startDate',selectedDate)
                          }
                          else {
                            setIsDateTimePickerVisible(false)
                            console.log("cancel test")
                          }
                        }}
                      />
                  )}
                <RenderError errors={errors.startDate} touched={touched.startDate} />
                
                  <Text style={styles.subtitle}>
                    3. 프로젝트 기간 (단위: 일)
                    <RenderHelp messagetype={HelpMessage.duration}/>
                  </Text>
                  <TextInput
                    name="duration"
                    placeholder="프로젝트 기간 입력"
                    style={styles.textInput}
                    onChangeText={value => {
                        const parsedvalue = parseInt(value)
                        if (!isNaN(parsedvalue)){
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
                <RenderError errors={errors.duration} touched={touched.duration} />
                

                <Text style={styles.subtitle}>
                  4. 프로젝트 체험 기간 (단위: 일)
                  <RenderHelp messagetype={HelpMessage.experienceduration}/> 
                </Text>
                  <TextInput
                    name="experienceduration"
                    placeholder="프로젝트 체험 기간 입력"
                    style={styles.textInput}
                    onChangeText={value => {
                        const parsedvalue = parseInt(value)
                        if (!isNaN(parsedvalue)){
                            setFieldValue('experienceduration',parsedvalue,10);
                        }
                        else {
                            values.experienceduration =''
                            console.log("string is typed")
                        }
                    }}
                    onBlur={handleBlur('experienceduration')}
                    keyboardType='numeric'
                  />
                <RenderError errors={errors.experienceduration} touched={touched.experienceduration} />
                

                <Text style={styles.subtitle}>
                  5. 최소 학습시간 (단위: 분)
                  <RenderHelp messagetype={HelpMessage.dailyStudyTime}/>
                </Text>
                  <TextInput
                    name="dailyStudyTime"
                    placeholder="최소 학습시간 입력"
                    style={styles.textInput}
                    onChangeText={value => {
                        const parsedvalue = parseInt(value)
                        if (!isNaN(parsedvalue)){
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
                <RenderError errors={errors.dailyStudyTime} touched={touched.dailyStudyTime} />
                

                <Text style={styles.subtitle}>
                  6. 복습 강도 (최소 1단계 ~ 10단계)
                  <RenderHelp messagetype={HelpMessage.repeatstrength}/>
                </Text>
                  <TextInput
                    name="repeatstrength"
                    placeholder="복습 강도 입력"
                    style={styles.textInput}
                    onChangeText={value => {
                        const parsedvalue = parseInt(value)
                        if (!isNaN(parsedvalue)){
                            setFieldValue('repeatstrength',parsedvalue,10);
                        }
                        else {
                            values.repeatstrength =''
                            console.log("string is typed")
                        }
                    }}
                    onBlur={handleBlur('repeatstrength')}
                    keyboardType='numeric'
                  />
                <RenderError errors={errors.repeatstrength} touched={touched.repeatstrength} />

                <Text style={styles.subtitle}>
                  7. 프로젝트 인증 미션
                  <RenderHelp messagetype={HelpMessage.howToAuth}/>
                </Text>
                  <TextInput
                    name="howToAuth"
                    placeholder="프로젝트 일일 인증 미션을 입력해주세요"
                    style={styles.bigtextInput}
                    onChangeText={handleChange('howToAuth')}
                    onBlur={handleBlur('howToAuth')}
                    value={values.howToAuth}
                    multiline={true}
                  />
                <RenderError errors={errors.howToAuth} touched={touched.howToAuth} />
                

                <Text style={styles.subtitle}>8. 프로젝트 소개</Text>
                  <TextInput
                    name="projectIntroduce"
                    placeholder="프로젝트 소개를 입력해주세요"
                    style={styles.bigtextInput}
                    onChangeText={handleChange('projectIntroduce')}
                    onBlur={handleBlur('projectIntroduce')}
                    value={values.projectIntroduce}
                    multiline={true}
                  />
                <RenderError errors={errors.projectIntroduce} touched={touched.projectIntroduce} />
                

                <Text style={styles.subtitle}>
                  9. 보증금
                  <RenderHelp messagetype={HelpMessage.deposit}/>
                </Text>
                  <TextInput
                    name="deposit"
                    placeholder="프로젝트의 보증금을 입력해주세요. (단위 원)"
                    style={styles.textInput}
                    onChangeText={value => {
                      const parsedvalue = parseInt(value)
                      if (!isNaN(parsedvalue)){
                          setFieldValue('deposit',parsedvalue,10);
                      }
                      else {
                          values.deposit =''
                          console.log("string is typed")
                      }
                    }}
                    onBlur={handleBlur('deposit')}
                    keyboardType='numeric'
                  />
                <RenderError errors={errors.deposit} touched={touched.deposit} />
                

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
    FormStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
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
    },
    textStyle: {
      width: '55%',
      padding: 10,
      backgroundColor: 'white',
      fontSize: 15,
      marginTop: 7,
      color: 'black',
    },
    pickerstyle:{
      width: "90%",
      marginTop:'1%',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderRadius: 10,
      paddingRight: 30,
      color:"black",
      backgroundColor: 'white',
    },
  });

export default ProjectForm;
