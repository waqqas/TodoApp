// @flow
import React, {Component} from 'react'
import {View} from 'react-native'
import {Field, reduxForm, initialize} from 'redux-form'
import FormInput from './FormInput'
import _ from 'lodash'
import {connect} from 'react-redux';

import {required, minSizeValue2} from "../Libs/Validators";
import type {AddTaskFormValues, Task} from "../Models";



type Props = {
  task: ?Task,
  initializeForm: (AddTaskFormValues) => void
}

class AddTaskForm extends Component<Props> {
  props: Props

  componentDidMount() {
    // initialize form from task, if available
    if (this.props.task) {
      this.props.initializeForm(_.omit(this.props.task, 'id'))
    }
  }

  render() {
    return (
      <View>
        <Field
          name='title'
          placeholder='Title'
          validate={[minSizeValue2]}
          component={FormInput}
        />
        <Field
          name='done'
          component={FormInput}
        />
      </View>
    )

  }
}

const AddTaskFormRedux = reduxForm({
  form: 'addTask'
})(AddTaskForm)


const mapStateToProps = (state) => {
  return {
    initialValues: {title: '', done: false}
  };
};

const mapDispatchToProps = (dispatch) => ({
  initializeForm: (values) => dispatch(initialize('addTask', values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskFormRedux)
