import React from 'react';
import {createStackNavigator} from 'react-navigation';

import SplashScreen from '../Containers/SplashScreen';

const AppNav = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'none'
});

export default AppNav;
