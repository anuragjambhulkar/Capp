import { View, Text, Platform, Alert } from 'react-native'
import React from 'react'
// import { Image } from 'expo-image';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { blurhash } from "../utils/common";
import { useAuth } from '../context/authContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'react-native-expo-image-cache';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems';
import Feather from '@expo/vector-icons/Feather';

const ios = Platform.OS == 'ios';
export default function ChatHeader() {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();
    const handleProfile = () => {
        console.log('clicked');
        Alert.alert('Profile ', 'clicked');
    }
    const handleLogout = async () => {
        await logout();
    }
    return (
        <View style={{ paddingTop: ios ? top : top + 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ea590c', paddingHorizontal: wp(3), paddingBottom: hp(4), borderBottomLeftRadius: 30, borderBottomRightRadius: 30, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10 }} >
            <View>
                <Text style={{ fontSize: hp(4) }} className='font-extrabold text-white ' >Chats!</Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper:{
                            
                        }
                        }} >
                        <Image
                            style={{ height: hp(4.5), width: hp(4.5), borderRadius: 100 }}
                            uri={user?.profileUrl}
                            placeholder={blurhash}
                            preview={{ uri: 'image-preview-uri' }}  // Optional, for showing a preview before the full image loads
                            transitionDuration={800}                // Optional transition
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                borderRadius: 15,
                                borderCurve: 'continuous',
                                marginTop: 40,
                                marginLeft: -32,
                                backgroundColor: '#212121',
                                shadowOpacity: 0.2,
                                shadowOffset: { width: 0, height: 0 },
                                width: 180
                            }
                        }}
                    >
                        <MenuItem
                            text="Profile"
                            action={handleProfile}
                            value={null}
                            icon={<Feather name="user" size={hp(2.5)} color='#727272' />}
                        />
                        <Divider />
                        <MenuItem
                            text="Sign Out"
                            action={handleLogout}
                            value={null}
                            icon={<MaterialIcons name="logout" size={hp(2.5)} color="#727272" />}
                        />
                    </MenuOptions>
                </Menu>



            </View>
        </View>
    )
}

const Divider = () => {
    return (
        <View style={{ backgroundColor: '#818181', padding: 1 }} />

    )
}