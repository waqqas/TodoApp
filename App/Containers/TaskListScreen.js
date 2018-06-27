import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

import {Screen} from '../Themes/ApplicationStyles'
import TasksActions, {getTaskList} from "../Redux/TasksRedux";


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
  return {
    tasks: getTaskList(state)
  };
};
const mapDispatchToProps = (dispatch) => ({
  addTask: (task) => dispatch(TasksActions.addTask(task))
});
export default connect(mapStateToProps, mapDispatchToProps)(TaskListScreen);
