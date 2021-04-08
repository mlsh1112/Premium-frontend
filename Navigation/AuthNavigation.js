import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Authentication from '../Screen/Main/Authentication';
import TutorAuthentication from '../Screen/AuthenticationScreen/TutorAuthentication';
import TutorAuthCheck from '../Screen/AuthenticationScreen/TutorAuthCheck'
const StackForAuth = createStackNavigator();

export default function createProjectStackNav(){
    return (
        <StackForAuth.Navigator initialRouteName='Authentication'>
            <StackForAuth.Screen name="Authentication" component={Authentication} options={{headerShown: false}} />
            <StackForAuth.Screen name="TutorAuthentication" component={TutorAuthentication}/>
            <StackForAuth.Screen name="TutorAuthCheck" component={TutorAuthCheck} options={{headerTitle: 'Tutee 인증 내용'}}/>
        </StackForAuth.Navigator>
    );
}

