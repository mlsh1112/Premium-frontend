import React from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import {Button} from '../../src/components/Button';
import explain from '../../assets/일정생성설명.png' 
import ImageModal from 'react-native-image-modal';

const ExplainModal = props => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.modalBackground}>
        <View style={{flex:1,marginTop:50,width:'100%'}}>
        
            <Image source={explain} resizeMode="contain" style={{width:'100%',height:'100%',}}/>
        </View>
        <View style={styles.modal}>
            <Button onPress={()=>props.setModalVisible(false)}>Close</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems:'center',
      width: Dimensions.get("screen").width,
      borderRadius: 30,
      backgroundColor:'white',
      marginVertical:100,
    },
    modal: {
      width: "80%",
      height: "20%",
    }
  });

export default ExplainModal;