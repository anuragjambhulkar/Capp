import { View, Text, Image, TextInput, Pressable, Platform, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'react-native-web';
import { router } from 'expo-router';
import { useAuth } from '../context/authContext';
import { FontAwesome5, Octicons, Feather } from '@expo/vector-icons'; // Added Feather for eye icons
import Loading from '../components/Loading';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  // State to toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegister = async () => {
    if (!username || !profile || !email || !password) {
      Alert.alert('Sign Up', 'Please fill all the fields.');
      return;
    }

    setLoading(true);
    let response = await register(username, profile, email, password);
    setLoading(false);

    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={hp(2)} // Adjust this value if needed
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar style="dark" />
        <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
          <View>
            <Image style={{ height: hp(15) }} resizeMode="contain" source={require('../assets/images/logoils.png')} />
          </View>
          <Text style={{ fontSize: hp(1) }} className="font-bold tracking-wider text-center text-purple-600" />

          <View className="gap-5">
            {/* Username Input */}
            <View style={{ height: hp(7) }} className="pl-3 flex-row gap-4 px4 bg-neutral-100 items-center rounded-2xl">
              <FontAwesome5 name="user-circle" size={hp(2.8)} color={212121} />
              <TextInput
                onChangeText={setUsername}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-600"
                placeholder="Username"
                placeholderTextColor={212121}
                value={username}
              />
            </View>

            {/* Profile Input */}
            <View style={{ height: hp(7) }} className="pl-3 flex-row gap-4 px4 bg-neutral-100 items-center rounded-2xl">
              <FontAwesome5 name="images" size={hp(2.8)} color={212121} />
              <TextInput
                onChangeText={setProfile}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-600"
                placeholder="Profile"
                placeholderTextColor={212121}
                value={profile}
              />
            </View>

            {/* Email Input */}
            <View style={{ height: hp(7) }} className="pl-3 flex-row gap-4 px4 bg-neutral-100 items-center rounded-2xl">
              <Octicons name="mail" size={hp(2.8)} color={212121} />
              <TextInput
                onChangeText={setEmail}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-600"
                placeholder="Email/Mobile Number"
                placeholderTextColor={212121}
                value={email}
              />
            </View>

            {/* Password Input with Show/Hide Functionality */}
            <View style={{ height: hp(7) }} className="pl-3 flex-row gap-4 px4 bg-neutral-100 items-center rounded-2xl">
              <Octicons name="key" size={hp(2.8)} color={212121} />
              <TextInput
                onChangeText={setPassword}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-600"
                placeholder="Password"
                secureTextEntry={!isPasswordVisible} // Toggle password visibility
                placeholderTextColor={212121}
                value={password}
              />
              {/* Show/Hide Password Icon */}
              <Pressable onPress={togglePasswordVisibility}>
                <Feather
                  name={isPasswordVisible ? 'eye' : 'eye-off'} // Toggle between eye and eye-off icons
                  size={20}
                  color="black"
                  className="pr-4"
                />
              </Pressable>
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

            {/* Sign Up Button */}
            <Pressable
              onPress={handleRegister}
              style={{ height: hp(7) }}
              className="bg-black border border-white rounded-2xl justify-center items-center"
            >
              <Text style={{ fontSize: hp(2.3) }} className="text-white font-extrabold tracking-wider">
                Sign Up
              </Text>
            </Pressable>

            {/* Sign In Navigation */}
            <View className="flex-row justify-center">
              <Text style={{ fontSize: hp(1.4) }} className="font-serif text-neutral-500">
                Already Have An Account,
              </Text>
              <Pressable onPress={() => router.push('signIn')}>
                <Text style={{ fontSize: hp(1.4) }} className="font-serif text-black">
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
