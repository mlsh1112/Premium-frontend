import React, { useState,useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
  } from 'react-native';
import {Button} from '../../src/components/Button';
import {getchapter, postoptions, createschedule} from '../../src/Api';
import colors from '../../src/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import SchedulePopup from './SchedulePopup'
import {HelpMessage,RenderHelp} from './Help';

const Chapter = (props) => {
    const [visibleconfim,setVisibleconfirm] = useState(false)
    const [schedule,setSchedule] = useState({})
    const [book,setBook] = useState()
    const [bookvisible,setBookvisible] = useState(false)
    const [chapters,setChapters] = useState([])
    const [toggleCheckBox, setToggleCheckBox] = useState(false) //false 휴식 허용 true 휴식 없음
    const [rest, setRest] = useState(0) //false 휴식 허용 true 휴식 없음
    const [modalVisible,setModalVisible] = useState(false)
    useEffect(() => {
      if (props.route.params?.selectedBook){
        setBook(props.route.params.selectedBook)
        setBookvisible(true)
      }
    },[props.route.params?.selectedBook])

    function RenderChapter({chapters}){
        return(
                    <View style={styles.chapterlist}>
                      {chapters.map((chapter,key) => {
                        return(
                          <View key={key} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',}}>
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
        setChapters(chapters.filter((f,idx) => idx !== key))
    }
    
    const goToChapterSearch = async() => {
      console.log('챕터 가져오기')
      if (book === undefined){
        alert('책을 먼저 선택해주세요.')
      }
      else {
        console.log('챕터가져오기 수행!!! : '+ book.title)
        const query = {title: book.title}
        getchapter({ book: query }).then(res => {
            res.data.chapters.map((chapter)=> {
                chapter.weight = 1
            })
            setChapters(res.data.chapters)
        }).catch((e) => {
            console.log(e)
        }
        )
        Alert.alert("챕터를 정리해주세요!","올바른 일정 생성을 위하여 책의 소단원만 남기고 대단원은 삭제해주세요.",)
      }
    }

    const completeCreateProject = () => {
      props.navigation.popToTop()
    }

    const getPreview = () => {
      console.log("미리보기")
      if (chapters[0] ===undefined){
        alert("[2. 챕터별 가중치 설정(최소 1 이상)] 을 먼저 해주세요!")
      }else {
        setVisibleconfirm(true)
        postoptions(
          {
            "option": {
              "options": chapters,
            }
          }
        ).then(() => {
          createschedule(props.route.params.projectId,{rest: rest}).then(res => {
            setSchedule(()=> res.data.options)
            setModalVisible(true)
          }).catch(e => {
              console.log(e.response)
          })
        }).catch(e => console.log(e))
      }
    }

    return (
        <ScrollView >
            <View>
                <View style={styles.FormStyle}>
                    <Text style={styles.subtitle}>1. 프로젝트 교재</Text>
                    {bookvisible && (
                      <View>
                        <Image style={styles.bookImage} source={{uri: book.thumbnail}} />
                        <View>
                          <Text style={styles.booktitle}>제목 : {book.title}</Text>
                          <Text style={styles.author}>저자 : {book.authors}</Text>
                        </View>
                      </View>
                    )}
                </View>
                <View style={styles.FormStyle}>
                    <Text style={styles.subtitle}>
                      2. 챕터별 가중치 설정 (최소 1 이상)
                      <RenderHelp messagetype={HelpMessage.weight}/>
                    </Text>
                    <Button onPress={goToChapterSearch}>챕터 불러오기</Button>
                    <RenderChapter chapters={chapters}/>
                </View>
                <View style={styles.FormStyle}>
                    <Text style={styles.subtitle}>
                      3. 일정 미리보기
                      <RenderHelp messagetype={HelpMessage.preview}/>
                    </Text>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                      <Text style={{fontSize:16,fontWeight:'bold'}}>프로젝트간 휴식 부여</Text>
                        {toggleCheckBox
                        ?<Text style={{margin:3,}}>[true]</Text>
                        :<Text style={{margin:3,}}>[false]</Text>}
                      <CheckBox
                          disabled={false}
                          value={toggleCheckBox}
                          onValueChange={(newValue) => {
                            setToggleCheckBox(newValue)
                            if (newValue){
                              setRest(1)
                            }
                            else {
                              setRest(0)
                            }
                          }}
                      />
                    </View>  
                    <Button onPress={getPreview}>일정 미리보기</Button>
                    <SchedulePopup visible={modalVisible} setModalVisible={setModalVisible} schedule={schedule} chapters={chapters}/>
                </View>
                {visibleconfim && (
                  <View style={styles.LastFormStyle}>
                    <Text style={styles.subtitle}>4. 일정 확정</Text>
                    <Button onPress={completeCreateProject}>일정 확정하기</Button>
                  </View>)
                }
            </View>
        </ScrollView>
        
    );
    
}

const styles = StyleSheet.create({

    FormStyle: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
    },
    LastFormStyle: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    textinput: {
        height: 40,
        width: '90%',
        margin: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        fontSize:15,
        fontWeight:'bold'
    },
    textStyle: {
        width: '55%',
        padding: 10,
        backgroundColor: 'white',
        fontSize: 15,
        marginTop: 7,
        color: 'black',
      },
    chapterlist: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
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
    thumbnail: {
        borderRadius: 13,
        width: 160,
        height: 200,
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
    subtitle: {
        width: "90%",
        fontWeight:"bold",
        fontSize: 20,
        margin: 5,
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

export default Chapter;