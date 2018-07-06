import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {Screen, FullButton} from '../Themes/ApplicationStyles'
import {Colors} from "../Themes";
import TasksActions from '../Redux/TasksRedux'

class SettingScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return ({
      title: 'Settings',
    })
  }

  onPressDeleteAllTask = () => {
    this.props.deleteAllTasks()
  }

  render() {
    return (
      <Screen>
        <FullButton backgroundColor={Colors.error} onPress={this.onPressDeleteAllTask}>DELETE ALL</FullButton>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => ({
  deleteAllTasks: () => dispatch(TasksActions.deleteAllTasks())
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
