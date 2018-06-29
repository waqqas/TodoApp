// @flow
import React, {Component} from 'react';
import {Text, FlatList, View} from 'react-native';
import {connect} from 'react-redux';

import {Screen, IconButton} from '../Themes/ApplicationStyles'
import {getTaskList} from "../Redux/TasksRedux";
import type {Task, Navigator} from "../Models";
import TaskRow from '../Components/TaskRow'

type Props = {
  tasks: Task[],
  navigation: Navigator,
}

class TaskListScreen extends Component<Props> {

  props: Props

  static navigationOptions = ({navigation}) => {
    const onPressAddTask = navigation.getParam('onPressAddTask', () => {
    })
    return ({
      title: 'Tasks',
      headerRight: <IconButton name='plus' onPress={onPressAddTask}/>
    })
  }


  componentDidMount() {
    this.props.navigation.setParams({onPressAddTask: this.onPressAddTask})
  }

  onPressAddTask = () => {
    this.props.navigation.navigate('AddTaskScreen')
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TaskListScreen);
