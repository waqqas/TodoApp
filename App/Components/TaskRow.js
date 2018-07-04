// @flow
import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {SwipeRow} from 'react-native-swipe-list-view'
import Icon from 'react-native-vector-icons/FontAwesome'

import {Colors} from '../Themes'
import type {Task} from "../Models";

type Props = {
  task: Task;
  onPressRow: (Task) => void;
  onPressDelete: (Task) => void;
}

export default class TaskRow extends Component<Props> {
  props: Props

  render() {
    const {task, onPressRow, onPressDelete} = this.props

    return (<SwipeRow onRowPress={onPressRow} leftOpenValue={75} disableLeftSwipe>
      <View style={{flex: 1, backgroundColor: Colors.red}}>
        <TouchableOpacity onPress={onPressDelete} style={{
          flex: 1,
          width: 75,
          backgroundColor: Colors.red,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon name={'trash'} color={Colors.white} style={{fontSize: 20}}/>
        </TouchableOpacity>
      </View>
      <View style={{
        flex: 1,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
      }}>
        <Text style={{marginHorizontal: 5, fontSize: 15, color: Colors.textInput}}>{task.title}</Text>
      </View>
    </SwipeRow>)

  }

}
