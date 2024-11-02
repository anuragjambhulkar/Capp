import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Header } from 'react-native/Libraries/NewAppScreen'
import ChatHeader from '../../components/ChatHeader'

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen
                name='home'
                options={{
                    header: () => <ChatHeader />
                }} />
        </Stack>
    )
}