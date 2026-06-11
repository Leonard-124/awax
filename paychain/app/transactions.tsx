
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const transactions = () => {
  return (
    <View className='bg-[#21812e] text-center text-xl min-h-screen'> 
      <Text>Hello: {" "} View your transactions</Text>
      <TouchableOpacity className='text-center underline' onPress={() => router.push("/(Tabs)/home")}>
        Go back
      </TouchableOpacity>
    </View>
  )
}

export default transactions;

const styles = StyleSheet.create({})