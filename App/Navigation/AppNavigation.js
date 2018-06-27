import React from 'react';
import {createStackNavigator} from 'react-navigation';

import SplashScreen from '../Containers/SplashScreen';
import TaskListScreen from '../Containers/TaskListScreen';

const AppNav = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  TaskListScreen: {screen: TaskListScreen},
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'none'
});

export default AppNav;
