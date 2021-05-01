import React, { Component,useEffect,useState } from 'react';
import {Button} from '../../src/components'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    ScrollView,
    Alert,
    Image,
  } from 'react-native';
import { Formik, validateYupSchema } from "formik";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Keyboard } from 'react-native';
import {Schema, InitValue} from './ValueSchema';

const validationSchema = Schema

const ProjectForm =(props)=> {
    const [isDateTimePickerVisible,setIsDateTimePickerVisible] = useState(false)
    const [book,setBook] = useState()
    const [bookvisible,setBookvisible] = useState(false)
    const [chapter,setChapter] = useState(new Object())
    
    useEffect(() => {
      console.log('lets update by useEffect')
      if (props.route.params?.selectedBook){
        console.log("/////////////////////////////")
        //console.log(props.route.params.selectedBook)
        setBook(props.route.params.selectedBook)
        setBookvisible(true)
        console.log("/////////////////////////////")
      }
      console.log("====================================")
      console.log(book)
      console.log("====================================")
    },[props.route.params?.selectedBook])
    const goToBookSearch = () => {
      console.log("책 검색하러가기")
      props.navigation.navigate("Book")
    }
    const handleSubmitPress = (values) =>{
      //if (book === undefined){
      //  alert("책을 선택해주세요.")
      //}
      //else {
      //  console.log(book)
      //}
      
      console.log("프로젝트 제출 : " + JSON.stringify(values))
      console.log("교재 : " + JSON.stringify(book))
    }
    const [date,setDate ] = useState(new Date())
    const now = new Date()
    const tommorow = now.setDate(now.getDate() + 1)

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
                <Text style={styles.subtitle}>1. 프로젝트 이름 </Text>
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
                  {(errors.startDate && touched.startDate) &&
                  <Text style={styles.errorText}>{errors.startDate}</Text>
                  }
                  <Text style={styles.subtitle}>
                    3. 프로젝트 기간 (단위: 일)
                    <TouchableOpacity onPress={() => {
                      Alert.alert("프로젝트 기간이란?","프로젝트를 진행하실 일수를 입력하시면 됩니다.",
                        )
                    }}>
                      <View style={{marginHorizontal: 5}}>
                        <Icon name="head-question-outline" color="red" size={20}/>
                      </View>
                    </TouchableOpacity>
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
                  {(errors.duration && touched.duration) &&
                  <Text style={styles.errorText}>{errors.duration}</Text>
                  }
                  <Text style={styles.subtitle}>
                    4. 프로젝트 체험 기간 (단위: 일)
                    <TouchableOpacity onPress={() => {
                      Alert.alert("프로젝트 체험 기간이란?","프로젝트의 체험기간을 입력하시면 됩니다.\n체험기간동안 튜티는 보증금 지불없이 생성하신 프로젝트를 체험할 수 있습니다.",
                        )
                    }}>
                      <View style={{marginHorizontal: 5}}>
                        <Icon name="head-question-outline" color="red" size={20}/>
                      </View>
                    </TouchableOpacity>  
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
                  {(errors.experienceduration && touched.experienceduration) &&
                  <Text style={styles.errorText}>{errors.experienceduration}</Text>
                  }
                  <Text style={styles.subtitle}>
                    5. 최소 학습시간 (단위: 분)
                    <TouchableOpacity onPress={() => {
                      Alert.alert("최소 학습시간이란?","튜티가 일일 학습을 진행할때 수행하여야 하는 최소 학습시간입니다.\n튜티는 프로젝트 진행간 최소 학습시간을 충족하여야 합니다.",
                        )
                    }}>
                      <View style={{marginHorizontal: 5}}>
                        <Icon name="head-question-outline" color="red" size={20}/>
                      </View>
                    </TouchableOpacity>  
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
                  {(errors.dailyStudyTime && touched.dailyStudyTime) &&
                  <Text style={styles.errorText}>{errors.dailyStudyTime}</Text>
                  }
                  <Text style={styles.subtitle}>
                    6. 복습 강도 (최소 1단계 ~ 10단계)
                    <TouchableOpacity onPress={() => {
                      Alert.alert("복습 강도란?","최소 학습시간을 기준으로 전날 공부한 내용을 복습하는 정도입니다. \n예시) 최소학습시간 : 1시간, 복습 강도 : 3단계인 경우 최소 학습시간 중 18분(최소학습시간 * 복습강도/10)을 복습하는 일정이 생성됩니다. ",
                        )
                    }}>
                      <View style={{marginHorizontal: 5}}>
                        <Icon name="head-question-outline" color="red" size={20}/>
                      </View>
                    </TouchableOpacity>  
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
                  {(errors.repeatstrength && touched.repeatstrength) &&
                  <Text style={styles.errorText}>{errors.repeatstrength}</Text>
                  }
                  <Text style={styles.subtitle}>
                    7. 프로젝트 인증 미션
                    <TouchableOpacity onPress={() => {
                      Alert.alert("프로젝트 인증 미션이란?","프로젝트에 참여한 튜티가 수행하여야하는 일일 학습 인증 미션입니다.\n※일일 학습 인증 방식은 text입력과 파일 업로드를 제공합니다. \n※해당 방식에서 자유롭게 기술하여 주시면 됩니다.\n\n예시)\n금일 학습내용 정리하여 텍스트 업로드\n예시)\n금일 푼 문제에 대하여 오답노트 작성 후 사진 업로드",
                        )
                    }}>
                      <View style={{marginHorizontal: 5}}>
                        <Icon name="head-question-outline" color="red" size={20}/>
                      </View>
                    </TouchableOpacity>  
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
                  {(errors.howToAuth && touched.howToAuth) &&
                  <Text style={styles.errorText}>{errors.howToAuth}</Text>
                  }
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
                  {(errors.projectIntroduce && touched.projectIntroduce) &&
                  <Text style={styles.errorText}>{errors.projectIntroduce}</Text>
                  }
                  <Text style={styles.subtitle}>9. 프로젝트 교재 선택</Text>
                  <View style={styles.button}>
                    {bookvisible && (
                      <View>
                        <Image style={styles.bookImage} source={{uri: book.thumbnail}} />
                        <View>
                          <Text style={styles.booktitle}>제목 : {book.title}</Text>
                          <Text style={styles.author}>저자 : {book.authors}</Text>
                        </View>
                      </View>
                    )}
                    <Button onPress={goToBookSearch}>책 검색하러가기</Button>
                  </View>
                  <Text style={styles.subtitle}>
                    10. 보증금
                    <TouchableOpacity onPress={() => {
                      Alert.alert("보증금 이란?","프로젝트에 튜티가 참여하기 위하여 처음 지불하는 금액입니다. 해당 보증금은 프로젝트 종료 후 환급됩니다.\n※보증금은 일일 학습 인증 횟수를 기준으로 환급됩니다.\n\n예시)\n30일간 진행되는 프로젝트에서 \n튜티1은 30번의 일일인증을 수행 -> 100% 환급\n튜티2는 15번의 일일 인증을 수행 -> 보증금의 50% 환급",
                        )
                    }}>
                      <View style={{marginHorizontal: 5}}>
                        <Icon name="head-question-outline" color="red" size={20}/>
                      </View>
                    </TouchableOpacity>
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
                    value={values.deposit}
                    keyboardType='numeric'
                  />
                  {(errors.deposit && touched.deposit) &&
                  <Text style={styles.errorText}>{errors.deposit}</Text>
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
    },
    bookImage: {
      width: 200,
      height:250,
      margin: 10,
    },
    booktitle: {
      fontWeight: 'bold',
      fontSize: 16,
      paddingHorizontal: 15,
      paddingVertical: 2,
    },
    author: {
        paddingHorizontal: 15,
        paddingVertical: 4,
    },
  });

export default ProjectForm;
