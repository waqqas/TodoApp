import React from 'react';
import {createStackNavigator} from 'react-navigation';

import SplashScreen from '../Containers/SplashScreen';
import TaskListScreen from '../Containers/TaskListScreen';
import AddTaskScreen from '../Containers/AddTaskScreen';

const MainNav = createStackNavigator({
  TaskListScreen: {screen: TaskListScreen},
  AddTaskScreen: {screen: AddTaskScreen},
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
