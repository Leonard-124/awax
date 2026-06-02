import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native'
import { useState } from 'react';
import { router } from 'expo-router';

interface BalanceCardProps {
  type: 'operating' | 'usdc';
  amount: number;
  change?: number;
  currency?: string;
}

export default function BalanceCard({ type, amount, change, currency = 'KES' }: BalanceCardProps) {
  const isOperating = type === 'operating';
  const [showpop, setShowpop] = useState(false)
  
  return (
    <View className={`${isOperating ? 'bg-emerald-700' : 'bg-gray-800'} rounded-3xl p-6 mr-4 w-64`}>
      <Text className={`${isOperating ? 'text-emerald-200' : 'text-gray-400'} text-xs mb-2`}>
        {isOperating ? 'OPERATING BALANCE' : 'USDC VAULT'}
      </Text>
      <Text className="text-white text-3xl font-bold mb-1">
        {isOperating ? `${currency} ${amount.toLocaleString()}` : amount.toFixed(2)}
      </Text>
      {!isOperating && <Text className="text-gray-400 text-sm mb-3">USDC</Text>}
      {change !== undefined && (
        <View className="flex-row items-center">
          {change > 0 ? (
            <TrendingUp size={16} color="#86efac" />
          ) : (
            <TrendingDown size={16} color="#fca5a5" />
          )}
          <Text className={`${isOperating ? 'text-emerald-300' : 'text-gray-400'} text-sm ml-2`}>
            {change > 0 ? '+' : ''}{change}% vs last month
          </Text>
        </View>
      )}
      <View className='bg-[#a8d6a2] p-1 rounded-xl text-center mt-4 text-sm text-[#6b6666] font-medium'>
        <TouchableOpacity className='' onPress={() =>setShowpop(true)}>
          MOVE MONEY
        </TouchableOpacity>
      </View>
      {showpop && (
        <TouchableOpacity className='bg-[#eaf7c9] rounded-3xl p-6 mr-4 w-64 mt-5' onPressOut={() => setShowpop(false)}>
          <TouchableOpacity onPressIn={() => router.replace("/send")} className='hover:bg-green-100'>Send Money</TouchableOpacity>
          <TouchableOpacity onPressIn={() => router.replace("/receive")} className="hover:bg-green-100">Receive money</TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
  );
}