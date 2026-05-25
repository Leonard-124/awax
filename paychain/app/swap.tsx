
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { ArrowLeft, ArrowUpDown } from 'lucide-react-native';
import { router } from 'expo-router';
import VerificationModal from '../components/VerificationModal';

export default function SwapScreen() {
    const [amount, setAmount] = useState('67,890');
    const [showModal, setShowModal] = useState(false);

    const receiveAmount = (parseFloat(amount.replace(/,/g, '')) / 130).toFixed(2);

    return (
        <ScrollView className='flex-1 bg-white'>
            <StatusBar barStyle="dark-content"/>
            <View className="px-6 pt-12 pb-32">
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-gray-900 font-bold text-xl">Inflation Shield</Text>
          </View>
          <Text className="text-gray-900 font-bold">PayChain</Text>
        </View>

        <View className="mb-6">
          <Text className="text-gray-500 text-xs mb-2">PROTECT YOUR WEALTH</Text>
          <Text className="text-gray-900 text-4xl font-bold">Collect. Pay. Grow.</Text>
        </View>

        <View className="flex-row mb-6">
          <View className="flex-1 bg-emerald-700 rounded-3xl p-6 mr-3">
            <Text className="text-emerald-200 text-xs mb-2">KES BALANCE</Text>
            <Text className="text-white text-3xl font-bold">KES 184,250</Text>
          </View>
          <View className="flex-1 bg-gray-800 rounded-3xl p-6">
            <Text className="text-gray-400 text-xs mb-2">USDC VAULT</Text>
            <Text className="text-white text-3xl font-bold">312.50 USDC</Text>
          </View>
        </View>

        <View className="bg-gray-50 rounded-2xl p-5 mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-gray-900 font-bold">KES → USDC</Text>
            <View className="bg-emerald-50 px-3 py-1 rounded-full">
              <Text className="text-emerald-700 text-xs font-bold">1 USDC = KES 130.00 • 0.5% fee</Text>
            </View>
          </View>
        </View>

        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-gray-700 font-bold">YOU SEND</Text>
            <TouchableOpacity>
              <Text className="text-emerald-600 font-bold">MAX</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white border-2 border-gray-200 rounded-2xl p-5 flex-row items-center">
            <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center mr-3">
              <Text className="text-emerald-700 font-bold">K</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-xs">KES</Text>
              <TextInput
                className="text-gray-900 text-2xl font-bold"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View className="items-center mb-6">
          <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center">
            <ArrowUpDown size={24} color="#059669" />
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-gray-700 font-bold mb-2">YOU RECEIVE</Text>
          <View className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 flex-row items-center">
            <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
              <Text className="text-white font-bold">$</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-xs">USDC</Text>
              <Text className="text-gray-900 text-2xl font-bold">{receiveAmount}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-emerald-700 rounded-2xl py-4 items-center"
          onPress={() => setShowModal(true)}
        >
          <Text className="text-white font-bold text-lg">Confirm Swap</Text>
        </TouchableOpacity>
      </View>

      <VerificationModal 
        visible={showModal} 
        onClose={() => setShowModal(false)}
        amount={parseFloat(amount.replace(/,/g, ''))}
      />
        </ScrollView>
    );
}
