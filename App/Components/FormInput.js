// @flow
import React, {Component} from 'react'
import {TitleInput, DoneSwitch} from '../Themes/ApplicationStyles'

import type { FieldProps } from 'redux-form'

export default class FormInput extends Component<FieldProps> {
  render() {

    const {
      input,
      input: {name},
      meta: {touched, error, warning},
      ...rest
    } = this.props

    console.log(`${name}: ${input.value}`)

    switch (name) {
      case 'title':
        return (
          <TitleInput
            value={input.value}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            {...rest}/>
        )
      case 'done':
        return (<DoneSwitch onValueChange={input.onChange} value={input.value}/>)
    }
  }
}
