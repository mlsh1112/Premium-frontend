import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/Home';
import Search from '../Screen/Search';
import Authentication from '../Screen/Authentication';
import Profile from '../Screen/Profile';

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
  