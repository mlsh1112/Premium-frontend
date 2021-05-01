import React, { Component,useState,useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
  } from 'react-native';
import {Button} from '../../src/components/Button';
import {getBook,getchapter,createBook} from '../../src/Api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Book = (props) => {
    const [title,setTitle] = useState('');
    const [booklist,setBooklist] = useState([]);
    const [book,setBook] = useState();
    const [chapters,setChapters] = useState([
        {"title": "I. 유리수와 순환소수"},
        {"title": "1. 유리수와 순환소수"},
        {"title": "II. 식의 계산"},
        {"title": "1. 단항식의 계산"},
        {"title": "2. 다항식의 계산"},
        {"title": "III. 일차부등식과 연립일차방정식"},
        {"title": "1. 일차부등식"},
        {"title": "2. 연립일차방정식"},
        {"title": "IV. 일차함수"},
        {"title": "1. 일차함수와 그 그래프"},
        {"title": "2. 일차함수와 일차방정식의 관계"},
        {"title": "I. 유리수와 순환소수"}])
    const requestBookSearch = () => {
        console.log("request book search")
        console.log(title)
        if(title===''){
            alert("교재 제목을 입력해주세요!")
        }
        else{
            getBook({
                "target": "title",
                "query": "수학의 정석",
                //"query": book.title,
                "size": 20,
            }).then(res => {
                setBooklist(res.data.documents)
            }).then(res => {
                //console.log(booklist)
                //console.log(booklist)
                //booklist.map((book) => {
                //    console.log("+++++++++++++++++++++++++++++++++++++")
                //    console.log(book.authors)
                //    console.log(book.title)
                //    console.log(book.contents)
                //    console.log(book.isbn)
                //    console.log(book.publisher)
                //    console.log(book.thumbnail)
                //    console.log(book.url)
                //})
            }).catch(e => {
                console.log(e)
            })
        }

    }
    const deletechapter = (key) => {
        //console.log("----------------------------" +key)
        setChapters(chapters.filter((f,idx) => idx !== key))
        //console.log("----------------------------" +JSON.stringify(chapters))
    }
    const registerBook = (book) => {
        console.log(book.title)
        //createBook({
        //    "title": book.title,
        //    "author": book.authors,
        //    "content": book.contents,
        //    "isbn": book.isbn,
        //    "publisher": book.publisher,
        //    "image": book.thumbnail,
        //    "url": book.url,
        //}).then(res => {
        //    console.log("+++++++++++++++++++++++++++++")
        //    console.log(res)
        //    props.navigation.goBack({params: {selectedBook: book}})
        //}).catch(e => {
        //    console.log(e)
        //})
        console.log('go back to make project')
        props.navigation.navigate({name: 'ProjectForm',params: {selectedBook: book}})
        //getchapter({book: {
        //    "title": book.title,
        //    }
        //}).then(res => {
        //    console.log(res)
        //}).catch(e => {
        //    console.log(e)
        //})
    }
    function RenderBook({booklist}){
        return(
            <View style={styles.booklist}>
                      {booklist.map((book,key) => {
                        return(
                          <TouchableOpacity style={styles.book} key={key} onPress={()=> registerBook(book)}>
                            <Image style={styles.thumbnail} source={{uri: book.thumbnail}} />
                            <View>
                                <Text style={styles.booktitle}>제목 : {book.title}</Text>
                                <Text style={styles.author}>저자 : {book.authors}</Text>
                            </View>
                          </TouchableOpacity>
                        )
                      })} 
            </View>
        )
    }
    function RenderChapter({chapters}){
        //console.log(chapters)
        return(
                    <View style={styles.chapterlist}>
                      {chapters.map((chapter,key) => {
                        return(
                          <View key={key}>
                              <Text style={styles.textStyle}>
                                {chapter.title}
                                  <TouchableOpacity
                                  style={styles.cancelButton} 
                                  onPress={(e)=>{
                                      deletechapter(key);
                                  }}>
                                      <Text stlye={styles.cancelText}>Cancel</Text>
                                  </TouchableOpacity>
                              </Text>
                          </View>
                        )
                      })}  
                    </View>
        )
    }

    return (
        <ScrollView >
            <View>
                <View style={styles.FormStyle}>
                    <Text style={styles.subtitle}>
                        책 검색 
                    </Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => setTitle(text)}
                        placeholder="프로젝트에서 사용하실 교재를 검색해주세요."
                    />
                    <Button onPress={requestBookSearch}>검색</Button>
                </View>
                <View>
                    <RenderBook booklist={booklist} />
                </View>
                
                <RenderChapter chapters={chapters}/>
                
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
    chapterlist: {
        padding: 10,
    },
    cancelButton: {
        //backgroundColor:colors.maincolor,
        padding:3,
        margin:3,
        borderRadius:5,
        alignItems: 'flex-end'
    },
    booklist: {
        flex:1,
        padding: 10,
    },
    book: {
        margin: 5,
        padding: 15,
        borderRadius: 15,
        elevation: 20,
        borderRadius: 15,
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
        fontSize: 18,
    }
  });

export default Book;
