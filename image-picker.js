import React, { useState,useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    Image,
    StatusBar,
    PermissionsAndroid, 
    Platform,
  } from 'react-native';

import { launchCamera,launchImageLibrary } from 'react-native-image-picker';

const Imagepicker = (props) => {
  const [imageSource, setImageSource] = useState('');
  
  const options = {
    title: 'Load Photo',
    customButtons: [
      { name: 'button_id_1', title: 'CustomButton 1' },
      { name: 'button_id_2', title: 'CustomButton 2' }
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
 
  const showCamera = () => {
    launchCamera(options, (response) => {
      if (response.error) {
        console.log('LaunchCamera Error: ', response.error);
      }
      else {
        console.log("user take picture!!")
        setImageSource(response.uri);
      }
    });
  };

  const showCameraRoll = () => {
    launchImageLibrary(options, (response) => {
      if (response.error) {
        console.log('LaunchImageLibrary Error: ', response.error);
      }
      else {
        console.log("user pick picture!!")
        console.log(response.uri)
        setImageSource(response.uri);
      }
    });
  };
  //const testfunction = () => {
  //  props.parent(imageSource);
  //}
  //useEffect(() => {
  //  props.parent(imageSource);
  //})
  return (
    <View style={styles.container}>
        { imageSource ? (<Image style={styles.Photo} source={{uri : imageSource}} />) : (<Text style={styles.Photo}>Empty</Text>)}
        <View style={styles.buttonview}>
            <Button title="카메라" style={styles.ImagepickerButton} onPress={showCamera} />
            <Button title="갤러리" style={styles.ImagepickerButton} onPress={showCameraRoll} />
            {/*<Button title="test" style={styles.ImagepickerButton} onPress={testfunction} />*/}
        </View>
    </View >
  );
};
const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'space-around',
        alignItems:'center',
        width: "100%",
    },
    buttonview : {
        flex : 0,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',
        width: "70%",
    },
    Photo : {
        width: 200,
        height: 200,
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 2,
        margin: 10,
    },
    ImagepickerButton : {
        width:50,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#CCCCCC",
        paddingRight: 32,
        paddingLeft: 32,
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 16,
    },
  });
export default Imagepicker;