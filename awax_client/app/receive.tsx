
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import React from 'react'

const receive = () => {
  return (
    <ScrollView className='bg-[#535953] min-h-screen'>
      <View className="m-2 rounded-md h-64 w-auto bg-[#3b3b38] flex flex-row justify-between">
        <Text>AWAX</Text>
        <View className="flex flex-col gap-2 m-5">
          <Text>Bal: USD 50</Text>
          <View className="w-auto m-1 rounded-md bg-[#6d6c60] h-10">d</View>
        </View>
      </View>
    </ScrollView>
  )
}

export default receive

const styles = StyleSheet.create({})