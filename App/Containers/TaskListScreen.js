// @flow
import React, {Component} from 'react';
import {Text, FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import type {NavigationScreenProp, NavigationState} from 'react-navigation'

import {Screen, IconButton, Content} from '../Themes/ApplicationStyles'
import TasksActions, {getTaskList} from "../Redux/TasksRedux";
import type {Task} from "../Models";
import TaskRow from '../Components/TaskRow'

type Props = {
  tasks: Task[];
  navigation: NavigationScreenProp<NavigationState>;
  getTasks: (void) => void;
  deleteTask: (Task) => void;
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
    this.props.getTasks()
  }

  onPressAddTask = () => {
    this.props.navigation.navigate('AddTaskScreen')
  }

  onPressRow(task: Task) {
    this.props.navigation.navigate('AddTaskScreen', {task})
  }

  onPressDelete(task: Task) {
    this.props.deleteTask(task)
  }

  renderTask = (item) => {
    const task: Task = item.item

    return (
      <TaskRow task={task} onPressRow={this.onPressRow.bind(this, task)}
               onPressDelete={this.onPressDelete.bind(this, task)}/>
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
        <Content padding={20}>
          <FlatList
            data={this.props.tasks}
            renderItem={this.renderTask}
            ListEmptyComponent={this.renderEmptyPlaceHolder()}
            keyExtractor={task => task._id}/>
        </Content>
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
  getTasks: () => dispatch(TasksActions.getTasks()),
  deleteTask: (task) => dispatch(TasksActions.deleteTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskListScreen);
