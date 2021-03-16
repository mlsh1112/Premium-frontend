import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from '../Screen/Onboarding';
import AuthLoading from '../Screen/AuthLoadingScreen';
import Signin from '../Screen/SigninScreen';
import Home from '../Screen/Home';

const Stack= createStackNavigator();

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}}/>
        <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
        <Stack.Screen name="AuthLoading" component={AuthLoading} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
)
