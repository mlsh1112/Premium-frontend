/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component,useRef} from 'react';
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
 import {RNCamera} from 'react-native-camera';
 import CameraRoll from "@react-native-community/cameraroll";
 
  const TakePhoto = () =>{
    const cameraRef = useRef(null); 
    const takePhoto = async () => {
        try {
            if (cameraRef) {
                const data = await cameraRef.current.takePictureAsync({
                    quality: 1,
                    exif: true,
                });
                console.log("==========================")
                console.log('data uri : '+ data.uri);
                if (Platform.OS === "android" && !(await hasAndroidPermission())) {
                   
                    return;
                }
                else {
                    console.log("you have android device and permission")
                }
                const result = await CameraRoll.save(data.uri) //save picture
                console.log("save finished!!  file uri" + JSON.stringify(result));    
            }    
        } catch (error) {
            console.log(error)
        }
    }
    const hasAndroidPermission = async() => {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }
      
     
    return (
        <View style={styles.container}>
          <Text style={styles.textstyle}>Hello world!</Text>
          <RNCamera
            ref={cameraRef}
            style={styles.camerastyle}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
          />
          <Button title="take a picture" onPress={takePhoto} />
        </View>
    );   
};

 
 const styles = StyleSheet.create({
   container : {
       flex : 1,
       justifyContent:'center',
       alignItems:'center'
   },
   textstyle:{
     fontSize:20,
     fontWeight:'bold'
   },
   camerastyle: {
    width: 200, 
    height: 200,
   }
 });
 
 export default TakePhoto;
 