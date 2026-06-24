
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { useState, useEffect } from 'react'
import { authedFetch, clearTokens, getRefreshToken } from './(Auth)/auth'

const BASE_URL = "https://paychain-backend.onrender.com"

interface meP {
  id: number,
  username: string
}

const trust_score = ({id, username}: meP) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [data, setData]

  useEffect(() => { fetchUser(); }, [])

  async function fetchUser() {
    setLoading(true);
    setError("");
    try {
      const res = await authedFetch("/me");
      if(!res.ok) {setError("Failed to load profile. Please try again"); return; }
    }
  }
  return (
    <View className='bg-[#eaf3eb] text-center text-xl'> 
      {/* <Text>Hello: {" "} View your trust score</Text>
      <TouchableOpacity className='text-center underline' onPress={() => router.push("/(Tabs)/home")}>
        Go back
      </TouchableOpacity> */}
      <View className='min-h-52 bg-[#f5f5f5]'>
       <Text></Text>
      </View>
    </View>
  )
}

export default trust_score;

const styles = StyleSheet.create({})