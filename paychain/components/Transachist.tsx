


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Transachist = () => {
//   return (
//     <View className='bg-[#f8f5f5] rounded-2xl w-96 p-6 h-48  flex-col items-center  px-10'>
//       <View className=''>
//         <Text className='text-[#525050] font-medium text-xl'>You have no recent transactions</Text>
//       </View>
//     </View>
//   )
// }

// export default Transachist

// const styles = StyleSheet.create({})

//////////////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://paychain-backend.onrender.com';

type Transaction = {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  phone?: string;
  createdAt: string;
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        const res = await fetch(`${BASE_URL}/api/transactions?limit=5`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setTransactions(Array.isArray(data) ? data : data.transactions ?? []);
        }
      } catch {
        // Silently fail — UI shows empty state
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <View>
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-gray-900 font-bold text-base">
          Recent Transactions
        </Text>
        <TouchableOpacity onPress={() => router.push('/transactions')} activeOpacity={0.7}>
          <Text className="text-emerald-600 font-medium text-sm">VIEW ALL</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="items-center py-6">
          <ActivityIndicator color="#059669" />
        </View>
      ) : transactions.length === 0 ? (
        <View className="bg-gray-50 rounded-2xl px-4 py-8 items-center">
          <Text className="text-gray-400 text-sm">No transactions yet</Text>
        </View>
      ) : (
        <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {transactions.map((tx, index) => {
            const isCredit = tx.type === 'credit';
            const formattedAmount = tx.amount.toLocaleString('en-KE', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });
            const formattedDate = new Date(tx.createdAt).toLocaleDateString(
              'en-KE',
              { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
            );

            return (
              <View
                key={tx.id}
                className={`flex-row items-center px-4 py-3 ${
                  index < transactions.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                {/* Icon */}
                <View
                  className={`w-9 h-9 rounded-full items-center justify-center mr-3 ${
                    isCredit ? 'bg-emerald-100' : 'bg-red-50'
                  }`}
                >
                  {isCredit ? (
                    <ArrowDownLeft size={16} color="#059669" />
                  ) : (
                    <ArrowUpRight size={16} color="#dc2626" />
                  )}
                </View>

                {/* Description */}
                <View className="flex-1">
                  <Text
                    className="text-gray-900 text-sm font-medium"
                    numberOfLines={1}
                  >
                    {tx.description}
                  </Text>
                  <Text className="text-gray-400 text-xs mt-0.5">
                    {tx.phone ?? formattedDate}
                  </Text>
                </View>

                {/* Amount */}
                <Text
                  className={`font-bold text-sm ${
                    isCredit ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {isCredit ? '+' : '-'}KES {formattedAmount}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default TransactionHistory;