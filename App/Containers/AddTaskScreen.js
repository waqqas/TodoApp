// @flow
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

import {isInvalid, isSubmitting, getFormValues} from 'redux-form'

import {Screen, IconButton, Content} from '../Themes/ApplicationStyles'
import TasksActions from "../Redux/TasksRedux";
import type {Task, Navigator, AddTaskFormValues} from "../Models";
import AddTaskForm from '../Components/AddTaskForm'

type Props = {
  task: Task,
  addTask: (AddTaskFormValues) => void,
  updateTask: (AddTaskFormValues, string) => void,
  navigation: Navigator,
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

    return ({
      title: 'Add Task',
      headerRight: <IconButton diabled={saveDisabled} name='save' onPress={onPressSave}/>
    })
  }


  componentDidMount() {
    this.props.navigation.setParams({onPressSave: this.onPressSave})
  }

  componentWillReceiveProps(nextProps: Props) {

    console.log('nextProps: ', nextProps)

    const prevSaveDisabled = this.props.navigation.getParam('saveDisabled', true)
    const saveDisabled = nextProps.invalid || nextProps.submitting
    if (prevSaveDisabled !== saveDisabled) {
      this.props.navigation.setParams({saveDisabled})
    }
  }

  onPressSave = () => {
    const task = this.props.navigation.getParam('task')

    if (task) {
      this.props.updateTask(this.props.values, task.id)
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
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    values: getFormValues('addTask')(state),
    invalid: isInvalid('addTask')(state),
    submitting: isSubmitting('addTas')(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  addTask: (form) => dispatch(TasksActions.addTask(form)),
  updateTask: (form, id) => dispatch(TasksActions.updateTask(form, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskScreen);
