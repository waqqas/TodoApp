// @flow
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import update from 'immutability-helper';
import uuid from 'uuid/v4'

import {Screen, IconButton, Content, TitleInput} from '../Themes/ApplicationStyles'
import TasksActions from "../Redux/TasksRedux";
import type {Task, Navigator} from "../Models";

type Props = {
  addTask: (Task) => void,
  navigation: Navigator
}

type State = {
  newTask: Task;
}

class AddTaskScreen extends Component<Props, State> {

  props: Props

  state: State = {
    newTask: {
      id: uuid(),
      title: '',
      done: false
    }
  }

  static navigationOptions = ({navigation}) => {
    const onPressSave = navigation.getParam('onPressSave', () => {
    })
    return ({
      title: 'Add Task',
      headerRight: <IconButton name='save' onPress={onPressSave}/>
    })
  }


  componentDidMount() {
    this.props.navigation.setParams({onPressSave: this.onPressSave})
  }

  onPressSave = () => {
    this.props.addTask(this.state.newTask)
    this.props.navigation.goBack()
  }

  onValueChange(field, value) {
    const newTask = update(this.state.newTask, {[field]: {$set: value}})
    this.setState({newTask})
  }


  render() {
    const {newTask} = this.state

    return (
      <Screen>
        <Content padding={20}>
          <TitleInput value={newTask.title} onChangeText={this.onValueChange.bind(this, 'title')}/>
        </Content>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => ({
  addTask: (task) => dispatch(TasksActions.addTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskScreen);
