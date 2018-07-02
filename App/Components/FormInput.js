// @flow
import React, {Component} from 'react'
import {View} from 'react-native'
import {TitleInput, DoneSwitch, FormValidationError} from '../Themes/ApplicationStyles'

import type {FieldProps} from 'redux-form'

export default class FormInput extends Component<FieldProps> {
  render() {

    const {
      input,
      input: {name},
      meta: {touched, error},
      ...rest
    } = this.props

    switch (name) {
      case 'title':
        return (
          <View>
            <TitleInput
              value={input.value}
              onChangeText={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              {...rest}/>
            {touched && error && <FormValidationError>{error}</FormValidationError>}
          </View>
        )
      case 'done':
        return (<DoneSwitch onValueChange={input.onChange} value={input.value}/>)
    }
  }
}
