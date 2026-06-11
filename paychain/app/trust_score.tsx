
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const trust_score = () => {
  return (
    <View className='bg-[#21812e] text-center text-xl'> 
      <Text>Hello: {" "} View your trust score</Text>
      <TouchableOpacity className='text-center underline' onPress={() => router.push("/(Tabs)/home")}>
        Go back
      </TouchableOpacity>
    </View>
  )
}

export default trust_score;

const styles = StyleSheet.create({})