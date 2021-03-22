import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from '../Screen/Onboarding';
import AuthLoading from '../Screen/AuthLoadingScreen';
import Signin from '../Screen/SigninScreen';
import Signup from '../Screen/SignUpScreen'
import Home from '../Screen/Home';
import Tabnavigation from './BottomTabNav';

const Stack = createStackNavigator();

export default function StackForLogin(){
    return (
        <Stack.Navigator initialRouteName='Onboarding'>
            <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}}/>
            <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
            <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
            <Stack.Screen name="AuthLoading" component={AuthLoading} options={{headerShown: false}}/>
            <Stack.Screen name="Main" component={Tabnavigation} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

