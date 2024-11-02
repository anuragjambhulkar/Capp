import { View, Text, Image, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native-web';
import { Octicons } from '@expo/vector-icons'; // Added AntDesign for the eye icon
import { router } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';
import Feather from '@expo/vector-icons/Feather';

export default function SignIn() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // State to toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to handle login
  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Enter the Email Address And Password");
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current); // Use the ref values directly
    setLoading(false);

    console.log('Sign In', response);
    if (!response.success) {
      Alert.alert('Sign In', response.msg);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View>
          <Image style={{ height: hp(25) }} resizeMode="contain" source={require('../assets/images/logoils.png')} />
        </View>
        <View className="gap-5">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-purple-600" />
          
          {/* Email Input Field */}
          <View style={{ height: hp(7) }} className="pl-3 flex-row gap-4 px4 bg-neutral-100 items-center rounded-2xl">
            <Octicons name="mail" size={hp(2.8)} color={212121} />
            <TextInput
              onChangeText={text => (emailRef.current = text)}  // Correct usage of onChangeText
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-600"
              placeholder="Email/Mobile Number"
              placeholderTextColor={212121}
            />
          </View>

          {/* Password Input Field with Show/Hide Functionality */}
          <View style={{ height: hp(7) }} className="pl-3 flex-row gap-4 px4 bg-neutral-100 items-center rounded-2xl">
            <Octicons name="key" size={hp(2.8)} color={212121} />
            <TextInput
              onChangeText={text => (passwordRef.current = text)} // Correct usage of onChangeText
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-600"
              placeholder="Password"
              secureTextEntry={!isPasswordVisible} // Toggle password visibility
              placeholderTextColor={212121}
            />
            {/* Show/Hide Password Icon */}
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather 
                name={isPasswordVisible ? 'eye' : 'eye-off'} // Toggle between eye and eye-off icons
                size={20}
                color="black"
                className= "pr-4"
              />
            </TouchableOpacity>
          </View>

          <View className="gap-2">
            <Text style={{ fontSize: hp(1.4) }} className="font-serif text-right pr-4 text-neutral-700">
              Reset Password
            </Text>
            {loading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(2)} />
              </View>
            ) : (
              <Text></Text>
            )}
          </View>

          {/* Sign In Button */}
          <Pressable
            onPress={handleLogin}
            style={{ height: hp(7) }}
            className="bg-black border border-white rounded-2xl justify-center items-center"
          >
            <Text style={{ fontSize: hp(2.3) }} className="text-white font-extrabold tracking-wider">
              Sign In
            </Text>
          </Pressable>

          <View className="flex-row justify-center">
            <Text style={{ fontSize: hp(1.4) }} className="font-serif text-neutral-500">
              Create An Account,
            </Text>
            <Pressable onPress={() => router.push('signUp')}>
              <Text style={{ fontSize: hp(1.4) }} className="font-serif text-black">
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
