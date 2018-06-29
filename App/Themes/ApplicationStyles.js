import React from 'react'
import styled from "styled-components/native/index";
import {Image, View, StatusBar, Text, TouchableOpacity, ScrollView, ActivityIndicator, Switch, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export const Screen = styled.View`
flex: 1;`

export const AppStatusBar = styled.StatusBar`
`

const AppIconButton = ({onPress, ...props}) => (
  <TouchableOpacity onPress={onPress}>
    <Icon size={20} {...props}></Icon>
  </TouchableOpacity>
)
export const IconButton = styled(AppIconButton)`
padding-horizontal: 10px;
`
