import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerBackTitleVisible: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Main',
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={({route}) => ({title: route.params.user.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
