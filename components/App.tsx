import React from 'react';
import { StatusBar } from 'react-native';
import 'expo-dev-client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LectureHalls from '../screens/LectureHalls';
import Labs from '../screens/Labs';
import Buildings from '../screens/Buildings';
import Greeting from './Greeting';
import Map from './Map';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Greeting">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Greeting" 
          component={Greeting} 
          options={{ headerShown: false }}  
        />

      <Stack.Screen 
          name="DirectionsScreen" 
          component={Map} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="LectureHalls" 
          component={LectureHalls} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Labs" 
          component={Labs} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Buildings" 
          component={Buildings} 
          options={{ headerShown: false }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
