import React,{useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {makelist} from './MakePickerItem'
import colors from '../colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function RenderChapter({chapters,deletechapter}){
    console.log(chapters)
    const pickerRef = useRef()
    function open(){
      pickerRef.current.focus();
    }
    function close(){
      pickerRef.current.blur()
    }
      return(
                  <View style={styles.chapterlist}>
                    {chapters.map((chapter,key) => {
                      return(
                        <View key={key} style={{flex:1,height:60,flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',marginVertical:3}}>
                            <Text style={styles.textStyle}>
                              {chapter.title}
                            </Text>
                            <View style={{width:' 25%',backgroundColor:'white',borderWidth:1,borderRadius: 20,borderColor: colors.subcolor}}>
                              <Picker
                              mode='dialog'
                                selectedValue={chapters[key].weight}
                                style={{ height: '100%', width: '100%',}}
                                onValueChange={(itemValue)=> {
                                  const idx = key
                                  chapters[idx].weight = itemValue
                                  console.log(chapters[idx])
                                }}
                              >
                                {makelist(10)}
                              </Picker>
                            </View>

                            <TouchableOpacity
                              onPress={(e)=>{
                                  deletechapter(key);
                              }}
                            >
                                <Icon name="close-box" color={colors.maincolor} size={30} />
                            </TouchableOpacity>
                        </View>
                      )
                    })}  
                  </View>
      )
    }

    const styles = StyleSheet.create({
        textStyle: {
            width: '65%',
            height: '100%',
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: colors.subcolor,
            textAlignVertical:'center',
            padding: 10,
            fontSize: 16,
            color: 'black',
          },
        chapterlist: {
            width: '100%',
            padding: 10,
            marginBottom: 10,
            justifyContent: 'space-between',
        },
        pickerstyle:{
          width: "20%",
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
    