import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../colors'

const Button = ({ onPress, children }) => {
  const { button, text } = styles;
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={styles.buttonposition} onPress={onPress}>
                <Text style={styles.buttonstyle}>{children}</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = {
    buttonposition:{
        width: 327,
        height: 50,
        backgroundColor: colors.maincolor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32
    },
    buttonstyle:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
};

export { Button };