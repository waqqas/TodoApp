// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, NetInfo} from 'react-native'
import StatusBarAlert from 'react-native-statusbar-alert'

import AppNavigation from '../Navigation/AppNavigation'
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import AppActions, {isNetDisconnected} from '../Redux/AppRedux'
import {Colors} from '../Themes'
import {AppStatusBar} from '../Themes/ApplicationStyles'

import type {ConnectionInfo} from '../Models'

type Props = {
  isNetDisconnected: boolean;
  startup: (void) => void,
  changeConnectionInfo: (ConnectionInfo) => void,
}

type State = {
  isNetDisconnected: boolean;
}

class RootContainer extends Component<Props, State> {

  state: State = {
    isNetDisconnected: false
  }

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }

    NetInfo.addEventListener('connectionChange', this.handleNetInfoChange)
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleNetInfoChange)
  }

  handleNetInfoChange = (connectionInfo) => {
    this.props.changeConnectionInfo(connectionInfo)
  }

  hideAlert = () => {
    this.setState({isNetDisconnected: false})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isNetDisconnected: nextProps.isNetDisconnected})

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar/>
        <StatusBarAlert
          visible={this.state.isNetDisconnected}
          message='No connection'
          backgroundColor={Colors.error}
          color={Colors.white}
          pulse={'background'}
          onPress={this.hideAlert}
        />
        <AppNavigation/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isNetDisconnected: isNetDisconnected(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  changeConnectionInfo: (connectionInfo) => dispatch(AppActions.changeConnectionInfo(connectionInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
