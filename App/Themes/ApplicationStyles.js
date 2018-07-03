import React from 'react'
import styled from "styled-components/native/index";
import {
  Image,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Switch,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import {Colors} from '../Themes'

export const Screen = styled.View`
flex: 1;`

export const AppStatusBar = styled.StatusBar`
`

const AppIconButton = ({onPress, disabled, ...props}) => (
  <TouchableOpacity onPress={!disabled ? onPress : null}>
    <Icon size={20} {...props}></Icon>
  </TouchableOpacity>
)
export const IconButton = styled(AppIconButton)`
padding-horizontal: 10px;
`

export const AppView = ({fixed, children, ...props}) => {
  if (fixed) {
    return (<View {...props}>{children}</View>)
  }
  else {
    return (<ScrollView {...props}>{children}</ScrollView>)
  }
}
export const Content = styled(AppView)`
flex:1;
background: ${Colors.transparent};
padding-horizontal: ${props => props.padding || 0}px
`


const FormInput = styled.View`
width: 100%;
margin-bottom: 24px;
padding-vertical: 10px;
background: ${Colors.white};
border-radius: 10px;
border-width: 1px;
border-color: ${Colors.transparent};
`

const TitleTextInput = ({...props}) => (
  <FormInput>
    <TextInput underlineColorAndroid={Colors.transparent} returnKeyType={'go'}
               keyboardType={'default'} {...props} />
  </FormInput>
)

export const TitleInput = styled(TitleTextInput)`
padding-left: 24px;
font-size: 15px;
color: ${Colors.textInput};
padding-vertical: 0px;
`

export const DoneSwitch = styled.Switch``

export const FormValidationError = styled.Text`
color: ${Colors.error};
font-size: 12px;
margin-vertical: 10px;
`


const ButtonText = styled.Text`
font-size: 18px;
color: ${props => props.color || '#FFFFFF'};
text-align: center;
`


const Processing = styled.ActivityIndicator`
`

const AppButton = ({spinner, disabled, children, textProps, onPress, ...props}) => (
  <TouchableOpacity onPress={!disabled ? onPress : null} {...props}>
    {!spinner && <ButtonText {...textProps}>{children}</ButtonText>}
    {spinner && <Processing color={props.backgroundColor || Colors.default} animating={spinner}/>}
  </TouchableOpacity>
)

export const FullButton = styled(AppButton)`
padding-vertical: 12px;
background: ${props => props.backgroundColor || Colors.default}${props => props.disabled ? '3E' : 'FF'};
`
