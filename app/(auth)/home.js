import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, StatusBar } from 'react-native'
import { useAuth } from '../../context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatHeader, { } from "../../components/ChatHeader";
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';
export default function Home() {

  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.uid)
      getUsers();
  }, [])
  const getUsers = async () => {
 ///
    const q =query(usersRef, where('userId' , '!=', user?.uid));
    const querySnapshot = await getDocs(q);
    let data =[];
    querySnapshot.forEach(doc=>{
      data.push({...doc.data()});
    });
    setUsers(data);
  }

  return (
    
      <View className="flex-1 bg-white">
        <StatusBar style="light" />
        {
          users.length>0? (
            <ChatList users={users} />
          ) : (
            <View className="flex items-center" style={{ top: hp(5) }}>
             <Loading size={hp(5)}/>
            </View>
          )
        }
      </View >
  )
}