import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Button } from 'react-native-web'
import { useAuth } from '../../context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function Home() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  }
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={handleLogout} style={{ height: hp(7) }} className=" bg-black border border-white rounded-2xl justify-center items-center" >
            <Text style={{ fontSize: hp(2.3) }} className="text-white font-extrabold tracking-wider" >
              Log Out
            </Text>
          </Pressable>
    </View >

  )
}