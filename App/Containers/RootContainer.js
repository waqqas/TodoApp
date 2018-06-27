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

  render() {
    return (
      <AppNavigation/>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
