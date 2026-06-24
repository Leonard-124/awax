
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const tills = () => {
  return (
    <View className='bg-[#21812e] text-center text-xl'> 
      <Text>Your tilll no: XX9XX4</Text>
      <TouchableOpacity className='text-center underline' onPress={() => router.back}>
        Go back
      </TouchableOpacity>
    </View>
  )
}

export default tills

const styles = StyleSheet.create({})