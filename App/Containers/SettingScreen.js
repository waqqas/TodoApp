import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {Screen} from '../Themes/ApplicationStyles'

class SettingScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return ({
      title: 'Settings',
    })
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
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
