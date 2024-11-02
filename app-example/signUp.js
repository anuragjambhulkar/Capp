import { View, Text, Image, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView, StatusBar } from 'react-native-web';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';



export default function signUp() {

  const emailRef = useRef("");;
  const PasswordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");
  const confirmPasswordRef = useRef("");
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);





  const handleRegister = async () => {
    if (!emailRef.current || !PasswordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert('Sign UP  ', " Fill all the Field");
      return;
    }
    // if(!Password==confirmPassword){
    //   Alert.alert("the password and confirm password must be same");
    //   return;
    // }
    // login sathi code 
    setLoading(true);
    let response = await register(usernameRef.current , profileRef.current ,emailRef.current, PasswordRef.current );
    setLoading(false);
    // show hide password sathi code
    console.log('got result', response);
    if (!response.success) {
      Alert.alert('SignUp', response.msg);
    }

  }

  return (
    <View>
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className="flex-1 gap-12" >
        {/* {theer was images here for the login page} */}
        <View>
          <Image style={{ height: hp(15) }} resizeMode='contain' source={require('../assets/images/logoils.png')} />
        </View>
        <View className="gap-5">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-purple-600" />
          <View style={{ height: hp(7) }} className=" pl-3 flex-row gap-4 px4 bg-neutral-100 items-center rounded-2xl">
            {/* mail icon change krne ahe */}
            <FontAwesome5 name='user-circle' size={hp(2.8)} color={212121} />
            <TextInput
              onChange={value => usernameRef.current = value}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-600"
              placeholder='Username'
              placeholderTextColor={212121}
            />
          </View>
          <View style={{ height: hp(2.5) }} className=" pl-3 flex-row gap-4 px4 bg-neutral-100 items-center rounded-2xl">
            {/* mail icon change krne ahe */}
            <FontAwesome5 name='images' size={hp(2.8)} color={212121} />
            <TextInput
              onChange={value => profileRef.current = value}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-600"
              placeholder='Profile'
              placeholderTextColor={212121}
            />
          </View>
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
          {/* <Pressable onPress={handleRegister} style={{ height: hp(7) }} className=" bg-black border border-white rounded-2xl justify-center items-center" >
            <Text style={{ fontSize: hp(2.3) }} className="text-white font-extrabold tracking-wider" >
              Sign Up
            </Text>
          </Pressable> */}
          <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: 'blue', padding: 10 }}>
            <Text style={{ color: 'black' }}>Press Me</Text>
          </TouchableOpacity>

          <View className=" flex-row justify-center">
            <Text style={{ fontSize: hp(1.4) }} className="font-serif text-neutral-500">
              Alredy Have An Account ,
            </Text>
            <Pressable onPress={() => router.push('signIn')}>
              <Text style={{ fontSize: hp(1.4) }} className="font-serif text-black ">
                Sign In
              </Text >
            </Pressable>
          </View>
        </View>
      </View>
    </ View>
  )

}