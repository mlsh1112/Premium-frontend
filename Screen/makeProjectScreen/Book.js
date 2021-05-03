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
import {getBook,createBook} from '../../src/Api';

const Book = (props) => {
    const [title,setTitle] = useState('');
    const [booklist,setBooklist] = useState([]);
    console.log("=================== project id =================")
    console.log(props.route.params.projectId)
    console.log("================================================")
    const requestBookSearch = () => {
        console.log("request book search")
        console.log(title)
        if(title===''){
            alert("교재 제목을 입력해주세요!")
        }
        else{
            getBook({
                "target": "title",
                "query": title,
                "size": 20,
            }).then(res => {
                setBooklist(res.data.documents)
            }).catch(e => {
                console.log(e)
            })
        }

    }
    const registerBook = (book) => {
        console.log(book.title)
        createBook({
            "title": book.title,
            "author": book.authors,
            "content": book.contents,
            "isbn": book.isbn,
            "publisher": book.publisher,
            "image": book.thumbnail,
            "url": book.url,
        }).then(res => {
            console.log("+++++++++++++++++++++++++++++")
            console.log(res)
            console.log("+++++++++++++++++++++++++++++")
            console.log('go back to chapter screen')
            props.navigation.navigate({name: 'Chapter',params: {selectedBook: book}})
        }).catch((e) => {
            if (e.response.data.result ==='이미 책이 존재합니다'){
                console.log('exist book')
            }
            // if(e.response.status === 401){
            //     console.error(e.response.status)
            // }else {
            //     console.error(e.response.status)
            // }
        })
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
