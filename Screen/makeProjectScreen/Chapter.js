import React, { Component,useState,useEffect } from 'react';
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
import {getchapter} from '../../src/Api';
import colors from '../../src/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Chapter = (props) => {
    const [book,setBook] = useState()
    const [bookvisible,setBookvisible] = useState(false)
    const [chapters,setChapters] = useState([])
    function RenderChapter({chapters}){
        console.log("============= chatper for render =============")
        console.log(chapters)
        console.log("==============================================")
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
        setChapters(chapters.filter((f,idx) => idx !== key))
        //console.log("-------------- 삭제되고 남은 챕터들 --------------")
        //console.log(JSON.stringify(chapters))
        //console.log("------------------------------------------------")
    }
    useEffect(() => {
        //console.log(chapters)
        console.log('lets update by useEffect')
        if (props.route.params?.selectedBook){
          console.log("/////////////////////////////")
          setBook(props.route.params.selectedBook)
          setBookvisible(true)
          console.log("/////////////////////////////")
        }
        // console.log("====================================")
        // console.log(book)
        // console.log("====================================")
    },[props.route.params?.selectedBook])
    
    const goToChapterSearch = async() => {
      console.log('챕터 가져오기')
      if (book === undefined){
        alert('책을 먼저 선택해주세요.')
      }
      else {
        console.log('챕터가져오기 수행!!! : '+ book.title)
        const query = {title: book.title}
        getchapter({ book: query}).then(res => {
            console.log("============ response ===========")
            console.log(res.data.chapters)
            console.log("=================================")
            res.data.chapters.map((chapter)=> {
                chapter.weight = 1
            })
            setChapters(res.data.chapters)
            console.log('============ chapters ============')
            console.log(chapters)
            console.log('==================================')
        }).then(()=> {
        }).catch((e) => {
            console.log(e)
        }
        )
        Alert.alert("챕터를 정리해주세요!","올바른 일정 생성을 위하여 책의 소단원만 남기고 대단원은 삭제해주세요.",)
      }
    }

    const sendChapterWeight = () => {
      console.log(chapters)
      //const formData = new FormData();
      // postoptions({
        // option: {
          // options: chapters,
        // }
      // }).then(res => console.log(res)).catch(e => console.log(e))
      //formData.append('auth[images_attributes][0][image]', {uri: imageinfo.uri, name: imageinfo.fileName, type: imageinfo.type});
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
                        <TouchableOpacity onPress={() => {
                          Alert.alert("챕터별 가중치란?","프로젝트 일정을 생성함에 있어 각 챕터별 학습기간을 정하는 데 필요한 값입니다. \n\n※프로젝트에 불필요하다 생각되는 챕터는 '챕터 삭제' 버튼을 눌러 제거해주세요.\n※가중치 값이 높을 수록 더 많은 일수가 챕터에 할당됩니다.\n※균형있는 일정 생성을 위한 권장 가중치 범위는 1 ~ 10 입니다. \n※필요에 따라 1이상의 이 범위를 벗어난 값 혹은 소수점이 포함된 값으로 가중치 설정이 가능합니다.\n\n예시)\n프로젝트 기간 : 30일 \n챕터1 가중치 : 3 \n챕터2 가중치 : 7 \n해당 경우 챕터1은 9일, 챕터2는 21일간의 일정이 분배됩니다. ",
                            )
                        }}>
                          <View style={{marginHorizontal: 5}}>
                            <Icon name="comment-question-outline" color="red" size={20}/>
                          </View>
                        </TouchableOpacity>
                    </Text>
                    <Button onPress={goToChapterSearch}>챕터 불러오기</Button>
                    <RenderChapter chapters={chapters}/>
                    <Button onPress={sendChapterWeight}>챕터 가중치 설정하기</Button>
                </View>
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
        marginBottom: 3,
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
