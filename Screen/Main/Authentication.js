import React, { Component,useState } from 'react';
import {
    StyleSheet,
    View,
  } from 'react-native';
import TuteeAuthentication from '../AuthenticationScreen/TuteeAuthentication'
import TutorAuthentication from '../AuthenticationScreen/TutorAuthentication'

const isTutee = true;
const Authentication = () => {
    return (
        <View style={styles.container}>
            {
                isTutee===true ? (
                    <TuteeAuthentication></TuteeAuthentication>
                ):(
                    <TutorAuthentication></TutorAuthentication>
                )
            }
            
      </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        width: "100%",
        justifyContent:'center',
        alignItems: 'center',
    },
  });

export default Authentication;
