import { View, Text, Platform } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native-web'


const Ios = Platform.OS == 'ios';
export default function CustomKeyboardView ({children}) {
  return (
    <KeyboardAvoidingView
      behavior={Ios ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >

      <ScrollView
        style={{ flex: 1 }}
        bouces={false}
        showsVerticalScrollIndicator={false}
      >
        {
        children
        }
      </ScrollView >
    </KeyboardAvoidingView>
  )
}