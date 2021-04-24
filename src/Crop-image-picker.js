import React, { useState,useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
  } from 'react-native';
import colors from './colors';
import ImagePicker from 'react-native-image-crop-picker';

const Cropimagepicker = (props) => {
  const [imageSource, setImageSource] = useState('');
 
  const showCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image)
      props.getImage(image)
      setImageSource(image.path)
    })
  };

  const showCameraRoll = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image)
      props.getImage(image)
      setImageSource(image.path)
    })
  };

  return (
    <View style={styles.container}>
        <View style={styles.pickedImage}>

          { imageSource ? (<Image style={styles.Photo} source={{uri : imageSource}} />) : (<Text style={styles.Photo}></Text>)}
        </View>
        <View style={styles.buttonview}>
            <TouchableOpacity style={styles.ImagepickerButton} onPress={showCamera}>
              <Text styles={styles.textstyle}>카메라</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ImagepickerButton} onPress={showCameraRoll}>
              <Text styles={styles.textstyle}>갤러리</Text>
            </TouchableOpacity>
            {/*<Button title="test" style={styles.ImagepickerButton} onPress={testfunction} />*/}
        </View>
    </View >
  );
};
const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
    },
    textstyle:{
     
    },
    pickedImage:{
      flex:2,
      alignItems: 'center',
      margin: 15,
    },
    buttonview : {
      flex:1,
      margin:30,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
    },
    Photo : {
      flex:1,
      width: 200,
      height: 200,
      borderWidth: 2,
      borderRadius: 10,
      borderColor:'black',
      backgroundColor: 'white',
    },
    ImagepickerButton : {
      flex:1,
      alignItems: 'center',
      backgroundColor: colors.maincolor,
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
      height:'40%',
      marginHorizontal: 10,
    },
  });
export default Cropimagepicker;