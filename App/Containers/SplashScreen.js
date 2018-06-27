import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';

import {getStartupStatus} from '../Redux/StartupRedux';
import {Screen, AppStatusBar} from '../Themes/ApplicationStyles'


class SplashScreen extends Component {

  componentDidMount() {
    if (this.props.startupSuccess === true) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'TaskListScreen'})],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startupSuccess === true) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'TaskListScreen'})],
      });
      this.props.navigation.dispatch(resetAction);

    }
  }

  render() {
    return (
      <Screen>
        <AppStatusBar hidden/>
        <Text>Splash</Text>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    startupSuccess: getStartupStatus(state),
  };
};
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
