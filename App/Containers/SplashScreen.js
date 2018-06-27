import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getStartupStatus} from '../Redux/StartupRedux';
import {Screen, AppStatusBar} from '../Themes/ApplicationStyles'


class SplashScreen extends Component {

  componentDidMount() {
    if (this.props.startupSuccess === true) {
      //TODO: navigate to main screen
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startupSuccess === true) {
      //TODO: navigate to main screen
    }
  }

  render() {
    return (
      <Screen>
        <AppStatusBar hidden/>
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
