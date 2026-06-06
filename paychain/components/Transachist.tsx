


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Transachist = () => {
  return (
    <View className='bg-[#f8f5f5] rounded-2xl w-96 p-6 h-48  flex-col items-center  px-10'>
      <View className=''>
        <Text className='text-[#525050] font-medium text-xl'>You have no recent transactions</Text>
      </View>
    </View>
  )
}

export default Transachist

const styles = StyleSheet.create({})