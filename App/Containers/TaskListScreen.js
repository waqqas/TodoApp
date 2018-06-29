// @flow
import React, {Component} from 'react';
import {Text, FlatList, View} from 'react-native';
import {connect} from 'react-redux';

import {Screen, IconButton} from '../Themes/ApplicationStyles'
import TasksActions, {getTaskList} from "../Redux/TasksRedux";
import type {Task} from "../Models";
import TaskRow from '../Components/TaskRow'

type Props = {
  tasks: Task[],
  addTask: (Task) => void
}

class TaskListScreen extends Component<Props> {

  props: Props

  static navigationOptions = () => {
    return ({
      title: 'Tasks',
      headerRight: <IconButton name='plus' onPress={() => {}} />
    })
  }


  componentDidMount() {
    setTimeout(() => {
      this.props.addTask({id: '1', title: 'task1', done: false})
    }, 1000)
  }

  onPressRow(task: Task) {
    alert('task:' + task.id)
  }

  renderTask = (item) => {
    const task: Task = item.item

    return (
      <TaskRow task={task} onPressRow={this.onPressRow.bind(this, task)}/>
    )
  }

  renderEmptyPlaceHolder() {
    return (
      <Text>No tasks found</Text>
    )
  }

  render() {
    return (
      <Screen>
        <FlatList
          data={this.props.tasks}
          renderItem={this.renderTask}
          ListEmptyComponent={this.renderEmptyPlaceHolder()}
          keyExtractor={item => item.id}/>
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
