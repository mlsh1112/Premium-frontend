import React, { Component, useState } from 'react';
import colors from '../../src/colors';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    ScrollView,
    StatusBar,
    Alert,
    Animated as RNAnimated,
    Easing as RNAnimatedEasing,
  } from 'react-native';
  import ReAnimated, {
    Easing as ReAnimatedEasing,
  } from 'react-native-reanimated';
  
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;

  const searchBarHeight=50;
  const topPosition= 0;
  const centerPosition =(height-searchBarHeight)/2;

  const useReanmiated=false;
  const Animated=useReanmiated?ReAnimated:RNAnimated;
  const Easing=useReanmiated?ReAnimatedEasing:RNAnimatedEasing;

function Search() {
    const [isOpened,setIsOpened]=useState(false);
    const animPosition=React.useRef(new Animated.Value(centerPosition));
    const animWidth=React.useRef();
    const animOpacity=React.useRef();
    const textRef=React.useRef();

    const [text,setText]=useState();
    const [newtext,setNewtext]=useState();

    const TextChangeHendler=(text)=>{        
        setNewtext(text);
    }
    
    const addText=()=>{
        setText([...text,newtext]);
        console.log(text);
    }
    
    
    const onFocus=()=>{
        setIsOpened(true);
        Animated.timing(animPosition.current,{
            toValue:topPosition,
            duration:300,
            easing:Easing.out(Easing.ease),
        }).start();
    };

    const onBlur=()=>{
        Animated.timing(animPosition.current,{
            toValue:centerPosition,
            duration:300,
            easing:Easing.in(Easing.ease),
        }).start(()=>setIsOpened(false));
    };

    
    animWidth.current = animPosition.current.interpolate({
        inputRange: [topPosition, centerPosition],
        outputRange: [width, width * 0.8],
      });
    
      animOpacity.current = animPosition.current.interpolate({
        inputRange: [0, centerPosition],
        outputRange: [1, 0],
      });

    return(
        <View style={styles.container}>
            <Animated.View
                style={{
                    opacity:animOpacity.current,
                    backgroundColor:'grenn',
                    paddingTop:searchBarHeight,
                    width:'100%',
                    height:'100%',
                }}>
                    {isOpened && (
          <ScrollView keyboardShouldPersistTaps={'always'}>
              {new Array(250).fill(Math.random()).map((val, index) => {
              return (
                <Text
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    marginBottom: 2,
                  }}
                  key={index}
                  onPress={() => alert('press:' + index)}>
                  검색내역: {index}
                </Text>
              );
                })}
          </ScrollView>
                  )}
            </Animated.View>
            <Animated.View
            style={{
                borderWidth: 1,
                position: 'absolute',
                alignSelf: 'center',
                justifyContent: 'center',
                height: searchBarHeight,
                width: animWidth.current,
                top: animPosition.current,
              }}>
                  <TextInput
                     ref={textRef}
                     onFocus={onFocus}
                     onBlur={onBlur}
                    style={{
                    backgroundColor: '#c8c8c8',
                    width: '100%',
                    height: '100%',
                    paddingHorizontal: 10,
                    fontSize: 14,
                    }}
                    onChangeText={(text)=>TextChangeHendler(text)}
        />
        {isOpened && (
          <Animated.Text
            onPress={addText}
            style={{ position: 'absolute', right: 10, padding: 10, opacity:animOpacity.current }}>
            검색
          </Animated.Text>
        )}
        </Animated.View>
        </View>
    )
 
}


   
const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default Search;
