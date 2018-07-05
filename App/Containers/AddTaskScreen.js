// @flow
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {isInvalid, isSubmitting, getFormValues} from 'redux-form'
import type {NavigationScreenProp, NavigationState} from 'react-navigation'
import update from 'immutability-helper'


import {Screen, IconButton, Content, FullButton} from '../Themes/ApplicationStyles'
import TasksActions from "../Redux/TasksRedux";
import type {Task, AddTaskFormValues} from "../Models";
import AddTaskForm from '../Components/AddTaskForm'
import {Colors} from '../Themes'

type Props = {
  addTask: (AddTaskFormValues) => void,
  updateTask: (Task) => void,
  deleteTask: (Task) => void,
  navigation: NavigationScreenProp<NavigationState>,
  invalid: boolean;
  submitting: boolean;
  values: AddTaskFormValues;
}

class AddTaskScreen extends Component<Props> {

  props: Props

  static navigationOptions = ({navigation}) => {
    const onPressSave = navigation.getParam('onPressSave', () => {
    })
    const saveDisabled = navigation.getParam('saveDisabled', true)
    const task = navigation.getParam('task')

    return ({
      title: task ? task.title : 'Add Task',
      headerRight: <IconButton disabled={saveDisabled} name='save' onPress={onPressSave}/>
    })
  }


  componentDidMount() {
    this.props.navigation.setParams({onPressSave: this.onPressSave})
  }

  componentWillReceiveProps(nextProps: Props) {
    const prevSaveDisabled = this.props.navigation.getParam('saveDisabled', true)
    const saveDisabled = (nextProps.invalid || nextProps.submitting)
    if (prevSaveDisabled !== saveDisabled) {
      this.props.navigation.setParams({saveDisabled})
    }
  }

  onPressDeleteTask = () => {
    const task = this.props.navigation.getParam('task')
    if (task) {
      this.props.deleteTask(task)
    }
    this.props.navigation.goBack()
  }

  onPressSave = () => {
    const task = this.props.navigation.getParam('task')

    if (task) {
      this.props.updateTask(update(task, {$merge: this.props.values}))
    }
    else {
      this.props.addTask(this.props.values)
    }

    this.props.navigation.goBack()
  }

  render() {
    const task = this.props.navigation.getParam('task')
    return (
      <Screen>
        <Content padding={20}>
          <AddTaskForm task={task}/>
        </Content>
        {task && <FullButton backgroundColor={Colors.error} onPress={this.onPressDeleteTask}>DELETE</FullButton>}
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    values: getFormValues('addTask')(state),
    invalid: isInvalid('addTask')(state),
    submitting: isSubmitting('addTask')(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  addTask: (form: AddTaskFormValues) => dispatch(TasksActions.addTask(form)),
  updateTask: (task: Task) => dispatch(TasksActions.updateTask(task)),
  deleteTask: (task: Task) => dispatch(TasksActions.deleteTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskScreen);
