import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import {Colors} from '../Themes'
import SplashScreen from '../Containers/SplashScreen';
import TaskListScreen from '../Containers/TaskListScreen';
import AddTaskScreen from '../Containers/AddTaskScreen';
import SettingScreen from '../Containers/SettingScreen';


const SettingNav = createStackNavigator({
  SettingScreen: {screen: SettingScreen},
}, {
  initialRouteName: 'SettingScreen',
});

const TaskNav = createStackNavigator({
  TaskListScreen: {screen: TaskListScreen},
  AddTaskScreen: {screen: AddTaskScreen},
}, {
  initialRouteName: 'TaskListScreen',
});

const MainNav = createBottomTabNavigator({
    TaskNav: {
      screen: TaskNav,
      navigationOptions: {
        tabBarLabel: 'Tasks'
      }
    },
    SettingNav: {
      screen: SettingNav,
      navigationOptions:
        {
          tabBarLabel: 'Settings'
        }
    }
  }, {
    lazy: true,
    initialRouteName: 'TaskNav',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.tabActive,
      inactiveTintColor: Colors.tabInActive,
      showIcon: false,
      showLabel: true,
      style: {backgroundColor: Colors.white},
      indicatorStyle: {backgroundColor: Colors.indicator}
    },
  }
)

const AppNav = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  MainNav: {screen: MainNav},
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'none'
});

export default AppNav;
