// @flow
import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import type {Task} from "../Models";

type Props = {
  task: Task,
  onPressRow: (Task) => void
}

export default class TaskRow extends Component<Props> {
  props: Props

  render() {
    const {task, onPressRow} = this.props

    return (<TouchableOpacity onPress={onPressRow}>
      <Text>{task.id}</Text>
      <Text>{task.title}</Text>
    </TouchableOpacity>)

  }

}
