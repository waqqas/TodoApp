import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppNavigation from '../Navigation/AppNavigation'
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';


class RootContainer extends Component {

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startupSuccess !== this.props.startupSuccess) {
    }
  }

// gets the current screen from navigation state
  getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getActiveRouteName(route);
    }
    return route.routeName;
  }

  render() {
    return (
      <AppNavigation onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = this.getActiveRouteName(currentState);
        const prevScreen = this.getActiveRouteName(prevState);

        if (prevScreen !== currentScreen) {
        }
      }}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    startupSuccess: state.startup.success,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
