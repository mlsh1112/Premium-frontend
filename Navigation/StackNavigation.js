import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from '../Screen/Onboarding';
//import AuthLoading from '../Screen/AuthLoadingScreen';
import Signin from '../Screen/SigninScreen';

const Stack= createStackNavigator();

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}}/>
        <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
    </Stack.Navigator>
)
