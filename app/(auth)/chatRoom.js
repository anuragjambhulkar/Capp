import { View, TextInput, StatusBar, Text, Pressable } from 'react-native';
import React, { useState } from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { useRoute } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function ChatRoom() {
    const item = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([]);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar style="dark" />
            <ChatRoomHeader user={item} router={router} />

            <View style={{ height: 1, borderBottomWidth: 1, borderColor: '#128128' }} />

            <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#F5F5F5', overflow: 'visible' }}>
                <MessageList messages={messages} />
            </View>

            <View style={{ marginBottom: hp(2.7), paddingTop: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: wp(3) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D3D3D3', padding: 8, borderRadius: 50, paddingLeft: 16, flex: 1 }}>
                        <TextInput
                            placeholder="Type Message"
                            style={{ fontSize: hp(2), flex: 1, marginRight: 8 }}
                        />
                        <Pressable onPress={() => console.log('Send Pressed')} style={{ backgroundColor: '#D3D3D3', padding: 8, marginRight: 1, borderRadius: 50 }}>
                            <Feather name="send" size={hp(2.5)} color="#737373" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}