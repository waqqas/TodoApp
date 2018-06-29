import React from 'react';
import {createStackNavigator} from 'react-navigation';

import SplashScreen from '../Containers/SplashScreen';
import TaskListScreen from '../Containers/TaskListScreen';

const MainNav = createStackNavigator({
  TaskListScreen: {screen: TaskListScreen},
}, {
  initialRouteName: 'TaskListScreen',
});

const AppNav = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  MainNav: {screen: MainNav},
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'none'
});

export default AppNav;
