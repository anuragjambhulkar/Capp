import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native-web';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';



export default function signIn() {

  const emailRef = useRef("");;
  const PasswordRef = useRef("");

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();


  const handleLogin = async () => {
    if (!emailRef.current || !PasswordRef.current) {
      Alert.alert("Enter the Email Address And Password");
      return;
    }
    // login sathi code 
    setLoading(true);
    const response = await login(emailRef.current, PasswordRef.current);
    setLoading(false)
    // show hide password sathi code
    console.log('sign In ', response);
    if(!response.success){
      Alert.alert('Sign In ' , response.msg);

    }

  }

  return (
    <View className="flex-1" >
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12" >
        {/* {theer was images here for the login page} */}
        <View>
          <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/logoils.png')} />
        </View>
        <View className="gap-5">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-purple-600" />
          <View style={{ height: hp(7) }} className=" pl-3 flex-row gap-4 px4 bg-neutral-100 items-center rounded-2xl">
            {/* mail icon change krne ahe */}
            <Octicons name='mail' size={hp(2.8)} color={212121} />
            <TextInput
              onChange={value => emailRef.current = value}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-600"
              placeholder='Email/Mobile Number'
              placeholderTextColor={212121}
            />
          </View>
          <View style={{ height: hp(7) }} className=" pl-3 flex-row gap-4 px4 bg-neutral-100 items-center rounded-2xl">
            {/* mail password che icons change krne ahe */}
            <Octicons name='key' size={hp(2.8)} color={212121} />
            <TextInput
              onChange={value => PasswordRef.current = value}
              style={{ fontSize: hp(2) }}
              className="flex-row font-semibold text-neutral-600"
              placeholder='Password'
              secureTextEntry
              placeholderTextColor={212121}
            />
          </View>
          <View className="gap-2">
            <Text style={{ fontSize: hp(1.4) }} className="font-serif  text-right pr-4 text-neutral-700 "  >Reset Password</Text>
            {
              loading ? (
                <View className=" flex row justify-center">
                  <Loading size={hp(2)} />
                </View>
              ) : (
                <Text> THE is Error</Text>
              )
            }
          </View>
          {/* login button  */}
          <Pressable onPress={handleLogin} style={{ height: hp(7) }} className=" bg-black border border-white rounded-2xl justify-center items-center" >
            <Text style={{ fontSize: hp(2.3) }} className="text-white font-extrabold tracking-wider" >
              Sign In
            </Text>
          </Pressable>

          <View className=" flex-row justify-center">
            <Text style={{ fontSize: hp(1.4) }} className="font-serif text-neutral-500">
              Create An Account ,
            </Text>
            <Pressable onPress={() => router.push('signUp')}>
              <Text style={{ fontSize: hp(1.4) }} className="font-serif text-black ">
                Sign UP
              </Text >
            </Pressable>
          </View>

        </View>
      </View>
    </View >
  )

}