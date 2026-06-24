

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const wallet = () => {
  return (
    <View className='bg-[#21812e] text-center text-xl min-h-screen'> 
      <Text>Your wallet balance for till: XX9XX4</Text>
      <TouchableOpacity className='text-center underline' onPress={() => router.push("/(Tabs)/home")}>
        Go back
      </TouchableOpacity>
    </View>
  )
}

export default wallet;

const styles = StyleSheet.create({})