
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'


const transactiondemo = [
  {
    id:1,
    reference: "XCHKYZTE",
    amount: "500",
    description: 'Confirmed payment of ksh. 500  to invest agencies'
  },
  {
    id:2,
    reference: "XNB76TF",
    amount: "8000",
    description: "Confirmed payment of ksh. 8000 to Global Pay services"
  },
  {
    id:3,
    reference: "VC2NM76G",
    amount: "4500",
    description: "Confirmed payment of ksh. 4500 to Vivo Enterprises"
  },
  {
    id:4,
    reference: "HN6DGPXB",
    amount: "6000",
    description: "Confirmed payment of ksh. 6000 to MenGas Agency"
  },
]


const transactions = () => {
  return (
    <View className='bg-[#35723c] text-center text-xl min-h-screen '> 
      {/* <Text>Hello: {" "} View your transactions</Text>
      <TouchableOpacity className='text-center underline' onPress={() => router.push("/(Tabs)/home")}>
        Go back
      </TouchableOpacity> */}
      <View className='flex flex-row justify-center gap-3   bg-[#f5f5f5] min-h-52 rounded-br-full'>
        <TouchableOpacity className='p-3 ml-2 mr-2 shadow-md rounded-md bg-[#62ac59] mt-10 h-fit' onPress={() => router.push("/send")}>
          <Text className='font-medium'>SEND</Text>
        </TouchableOpacity>
        <TouchableOpacity className='p-3 ml-2 mr-2 shadow-md rounded-md bg-[#62ac59] mt-10 h-fit' onPress={() => router.push("/receive")}>
          <Text className='font-medium'>RECEIVE</Text>
        </TouchableOpacity>
      </View>
      <View className='w-full   flex flex-row justify-center '>
        <View className='w-full bg-[#b7d3a4] min-h-40 scroll-auto mt-10  shadow-md rounded-md'>
          <Text className='text-center border-collapse border-b-gray-300'>Your recent transactions</Text>
          {transactiondemo.map((t) => (
            <View className='flex flex-col scroll-auto' key={t.id}>
              <View className='flex flex-row justify-between border gap-4'>
                <Text className='border border-l-2'>{t.amount}</Text>
                <Text>{t.description} ref: {t.reference}</Text>
                <Text className='border border-l-2'>{t.reference}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default transactions;

const styles = StyleSheet.create({})