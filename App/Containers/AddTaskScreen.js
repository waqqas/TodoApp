// @flow
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

import {Screen, IconButton} from '../Themes/ApplicationStyles'
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
      id: '',
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
  }

  render() {
    return (
      <Screen>
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
