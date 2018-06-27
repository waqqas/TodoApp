import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

import {Screen} from '../Themes/ApplicationStyles'


class TaskListScreen extends Component {

  render() {
    return (
      <Screen>
        <Text>Task List</Text>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(TaskListScreen);
