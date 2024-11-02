import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
export default function ChatItem({ item, router, noBorder }) {
  const openChatRoom = ()=>{
    router.push({pathname: '/chatRoom' , params:item});
  }
  return (
  
    <Pressable onPress={openChatRoom} className={`flex-row justify-between mx-3 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-b-neutral-400'}`}>
      <Image
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        source={item?.profileUrl}
        placeholder={blurhash}
        transition={500}
      />


      <View className="flex-1 gap-1">
        <View className=" flex-row " style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-950" > {item?.username}</Text>
          <Text style={{ fontSize: hp(1.5) }} className="font-medium text-neutral-950" > TIMe</Text>

        </View>
        <Text style={{ fontSize: hp(1.5) }} className="font-medium text-neutral-600">
          LAst MESSAGE
        </Text>

      </View>

    </Pressable>
  )
}