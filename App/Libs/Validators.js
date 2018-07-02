import _ from 'lodash'

export const required = value => _.isEmpty(value) ? 'Required' : undefined;

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

export const maxLength15 = maxLength(15)

export const number = value => _.isNumber(value) ? undefined : 'Must be a number'

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined

export const minValue1 = minValue(1)

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined
