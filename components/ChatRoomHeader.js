import { View, Text, Pressable } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Stack, router } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
export default function ChatRoomHeader({ user, router }) {
    const navigation = useNavigation();
    return (
        <Stack.Screen

            options={{
                title: '',
                headerShadowVisible: false,
                headerLeft: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={hp(4)} color='#212121' />
                        </Pressable>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <Image
                                source={user?.profileUrl ? { uri: user.profileUrl } : require('../assets/images/react-logo.png')}
                                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: hp(2.25) }}
                                contentFit="cover"
                            />
                            <Text style={{ fontSize: hp(2.5) }} className="text-neutral-700 font-medium ">
                                {user?.username}

                            </Text>
                        </View>
                    </View>
                ),
                headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginRight: 10 }}>
                        <Pressable onPress={() => console.log('Phone Call Pressed')}>
                            <Feather name="phone-call" size={hp(2)} color="black" />
                        </Pressable>
                        <Pressable onPress={() => console.log('Video Call Pressed')}>
                            <AntDesign name="videocamera" size={hp(2)} color="black" />
                        </Pressable>
                        <Pressable onPress={() => console.log('Settings Pressed')}>
                            <AntDesign name="setting" size={hp(2)} color='#212121' />
                        </Pressable>
                    </View>
                )

            }
            }

        />

    )
} 