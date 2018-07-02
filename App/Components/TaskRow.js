// @flow
import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Colors} from '../Themes'

import type {Task} from "../Models";

type Props = {
  task: Task,
  onPressRow: (Task) => void
}

export default class TaskRow extends Component<Props> {
  props: Props

  render() {
    const {task, onPressRow} = this.props

    return(<TouchableOpacity onPress={onPressRow} style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10}}>
      <Text style={{fontSize: 15, color: Colors.textInput}}>{task.title}</Text>
      <Icon name={task.done? 'check': 'times'} style={{fontSize: 20}}></Icon>
    </TouchableOpacity>)

  }

}
