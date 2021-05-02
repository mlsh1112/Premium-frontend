import React, { Component,useEffect,useState } from 'react';
import {Button} from '../../src/components'
import colors from '../../src/colors';
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
import {getchapter, postoptions} from '../../src/Api';

import RNPickerSelect from 'react-native-picker-select';

const validationSchema = Schema

const ProjectForm =(props)=> {
    const [isDateTimePickerVisible,setIsDateTimePickerVisible] = useState(false)
    const [book,setBook] = useState()
    const [bookvisible,setBookvisible] = useState(false)
    //const [chapter,setChapter] = useState(new Object())
    const [chapters,setChapters] = useState([
      //{"title": "I. 유리수와 순환소수"},
      //{"title": "1. 유리수와 순환소수"},
      //{"title": "II. 식의 계산"},
      //{"title": "1. 단항식의 계산"},
      //{"title": "2. 다항식의 계산"},
      ])
    const [category,setCategory] = useState([
      {label:"국어",value: "국어", },
      {label:"수학",value: "수학", },
      {label:"영어",value: "영어", }
    ])
    const [categoryid,setCategoryid] = useState('')
    function RenderChapter({chapters}){
      console.log(chapters)
      return(
                  <View style={styles.chapterlist}>
                    {chapters.map((chapter,key) => {
                      return(
                        <View key={key} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'space-between'}}>

                            <Text style={styles.textStyle}>
                              {chapter.title}
                            </Text>
                            <TextInput 
                              placeholder='가중치'
                              style={{backgroundColor: 'white',width:'20%',borderWidth: 1,borderRadius: 10,marginTop: 7,}}
                              onChangeText={(value)=> {
                                const idx = key
                                chapters[idx].weight = value
                                console.log(chapters[idx])
                              }}
                            >{chapters[key].weight}</TextInput>
                            <TouchableOpacity
                              style={styles.cancelButton} 
                              onPress={(e)=>{
                                  deletechapter(key);
                              }}
                            >
                                <Text style={{color:'white',fontWeight: 'bold'}}>챕터 삭제</Text>
                            </TouchableOpacity>
                        </View>
                      )
                    })}  
                  </View>
      )
    }
    const deletechapter = (key) => {
      //console.log("----------------------------" +key)
      setChapters(chapters.filter((f,idx) => idx !== key))
      //console.log("----------------------------" +JSON.stringify(chapters))
    }
    useEffect(() => {
      //console.log(chapters)
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
    const goToChapterSearch = async() => {
      console.log('챕터 가져오기')
      if (book === undefined){
      //if (false){
        alert('책을 먼저 선택해주세요.')
      }
      else {
        console.log('챕터가져오기 수행!!! : '+ book.title)
        const query = {title: book.title}
        const data = (await getchapter({ book: query})).data
        console.log(data)
        setChapters(data.chapters)
        chapters.map((chapter)=>{
          chapter.weight = 1,
          console.log(chapter)
        })
        console.log(chapters)
        Alert.alert("챕터를 정리해주세요!","올바른 일정 생성을 위하여 책의 소단원만 남기고 대단원은 삭제해주세요.",)
        // getchapter(
            // {
              // book: {
                //  title: book.title,
                //  }
            // }
          // ).then(res => {
            //  console.log(res)
          // }).catch(e => {
            //  console.log(e)
          // })
      }
    }
    const handleSubmitPress = (values) =>{
      //if (book === undefined){
      //  alert("책을 선택해주세요.")
      //}
      //else {
      //  console.log(book)
      //}
      const formData = new FormData();
      postoptions({
        option: {
          options: chapters,
        }
      }).then(res => console.log(res)).catch(e => console.log(e))
      //formData.append('auth[images_attributes][0][image]', {uri: imageinfo.uri, name: imageinfo.fileName, type: imageinfo.type});
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
                <Text style={styles.subtitle}>0. 프로젝트 카테고리 </Text>
                <View style={styles.pickerstyle}>
                  <RNPickerSelect
                      style={{width: 50,height: 50,}}
                      useNativeAndroidPickerStyle={false}
                      onValueChange={(value,index) => {
                        setCategoryid(value)
                        setFieldValue('categoryid',value)
                      }}
                      items={category}
                      placeholder={{  // 값이 없을때 보일 값, 없어도 된다면 이 안의 내용을 지운다. placeholder={{}} 이건 남겨둠.. 이부분까지 지우면 기본값으로 설정됨.
                        label: '인증할 프로젝트를 선택하세요',
                        value: '',
                      }}>
                      <Text>{categoryid}</Text>
                  </RNPickerSelect>
                </View>  
                {(errors.categoryid && touched.categoryid) &&
                <Text style={styles.errorText}>{errors.categoryid}</Text>
                }
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
                        <Icon name="comment-question-outline" color="red" size={20}/>
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
                        <Icon name="comment-question-outline" color="red" size={20}/>
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
                        <Icon name="comment-question-outline" color="red" size={20}/>
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
                        <Icon name="comment-question-outline" color="red" size={20}/>
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
                        <Icon name="comment-question-outline" color="red" size={20}/>
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
                    {bookvisible && (
                      <View>
                        <Image style={styles.bookImage} source={{uri: book.thumbnail}} />
                        <View>
                          <Text style={styles.booktitle}>제목 : {book.title}</Text>
                          <Text style={styles.author}>저자 : {book.authors}</Text>
                        </View>
                      </View>
                    )}
                  <View style={styles.button}>
                    <Button onPress={goToBookSearch}>책 검색하러가기</Button>
                  </View>
                  <Text style={styles.subtitle}>
                    10. 챕터별 가중치 설정 (최소 1 이상)
                    <TouchableOpacity onPress={() => {
                      Alert.alert("챕터별 가중치란?","프로젝트 일정을 생성함에 있어 각 챕터별 학습기간을 정하는 데 필요한 값입니다. \n\n※프로젝트에 불필요하다 생각되는 챕터는 '챕터 삭제' 버튼을 눌러 제거해주세요.\n※가중치 값이 높을 수록 더 많은 일수가 챕터에 할당됩니다.\n※균형있는 일정 생성을 위한 권장 가중치 범위는 1 ~ 10 입니다. \n※필요에 따라 1이상의 이 범위를 벗어난 값 혹은 소수점이 포함된 값으로 가중치 설정이 가능합니다.\n\n예시)\n프로젝트 기간 : 30일 \n챕터1 가중치 : 3 \n챕터2 가중치 : 7 \n해당 경우 챕터1은 9일, 챕터2는 21일간의 일정이 분배됩니다. ",
                        )
                    }}>
                      <View style={{marginHorizontal: 5}}>
                        <Icon name="comment-question-outline" color="red" size={20}/>
                      </View>
                    </TouchableOpacity>
                  </Text>
                  <RenderChapter chapters={chapters}/>
                  <View style={styles.button}>
                    <Button onPress={goToChapterSearch}>챕터 가져오기</Button>
                  </View>
                  <Text style={styles.subtitle}>
                    11. 보증금
                    <TouchableOpacity onPress={() => {
                      Alert.alert("보증금 이란?","프로젝트에 튜티가 참여하기 위하여 처음 지불하는 금액입니다. 해당 보증금은 프로젝트 종료 후 환급됩니다.\n※보증금은 일일 학습 인증 횟수를 기준으로 환급됩니다.\n\n예시)\n30일간 진행되는 프로젝트에서 \n튜티1은 30번의 일일인증을 수행 -> 100% 환급\n튜티2는 15번의 일일 인증을 수행 -> 보증금의 50% 환급",
                        )
                    }}>
                      <View style={{marginHorizontal: 5}}>
                        <Icon name="comment-question-outline" color="red" size={20}/>
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
    textStyle: {
      width: '55%',
      padding: 10,
      backgroundColor: 'white',
      fontSize: 15,
      marginTop: 7,
      color: 'black',
    },
    cancelButton: {
      backgroundColor:colors.maincolor,
      padding:3,
      margin:3,
      borderRadius:15,
      width: "20%",
      justifyContent: "center",
      alignItems: "center",
    },
    chapterlist: {
      width: '100%',
      padding: 10,
      justifyContent: 'space-between',
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
