// @flow
import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {ListItem} from 'react-native-elements'

import type {Task} from "../Models";

type Props = {
  task: Task,
  onPressRow: (Task) => void
}

export default class TaskRow extends Component<Props> {
  props: Props

  render() {
    const {task, onPressRow} = this.props

    return (<ListItem title={task.title} rightIcon={task.done? {type: 'font-awesome', name:'check'}: {type: 'font-awesome', name:'times'} } onPress={onPressRow}/>)

  }

}
