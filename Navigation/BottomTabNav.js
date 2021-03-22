import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/Main/Home';
import Search from '../Screen/Main/Search';
import Authentication from '../Screen/Main/Authentication';
import Profile from '../Screen/Main/Profile';

const TabNavigator = createBottomTabNavigator();

export default function Tabnavigation(){
    return (
        <TabNavigator.Navigator initialRouteName='Home'>
            <TabNavigator.Screen name="Home" component={Home} />
            <TabNavigator.Screen name="Search" component={Search} />
            <TabNavigator.Screen name="Authentication" component={Authentication} />
            <TabNavigator.Screen name="Profile" component={Profile} />
        </TabNavigator.Navigator>
    );
} 
  