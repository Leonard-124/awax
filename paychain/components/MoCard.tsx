


// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { router } from 'expo-router'

// const MoCard = () => {
//   return (
//     <View  className='bg-[#ffffff] text-sm flex flex-row h-60 items-center gap-2'>
//       <View className='text-center rounded-xl px-4 pt-6 bg-[#e4ece3] hover:bg-[#7fcf51] h-20'>
//         <TouchableOpacity onPress={() => router.replace("/(Tabs)/advance")}>
//             <Text>REQUEST ADVANCE</Text>
//         </TouchableOpacity>
//       </View>
//       <View className='text-center rounded-xl px-4 pt-6 bg-[#e4ece3] hover:bg-[#7fcf51] h-20'>
//         <TouchableOpacity onPress={() => router.navigate("/(Tabs)/pay")}>
//             <Text>SEND BULK PAYMENTS</Text>
//         </TouchableOpacity>
//       </View>
//       <View className="text-center rounded-xl px-4 pt-6 bg-[#e4ece3] hover:bg-[#7fcf51] h-20">
//         <TouchableOpacity onPress={() => router.push("/swap")}>
//             <Text>SWAP USDC</Text>
//         </TouchableOpacity>
//       </View>
//       <View className='text-center rounded-xl px-4 pt-6 bg-[#e4ece3] hover:bg-[#7fcf51] h-20'>
//         <TouchableOpacity onPress={() => router.push("/trust_score")}>
//             <Text>TRUST SCORE</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// export default MoCard

// const styles = StyleSheet.create({})


////////////////////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Smartphone, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://paychain-backend.onrender.com';

type MoData = {
  phone: string;
  tillNumber: string;
  lastDeposit: number;
  lastDepositDate: string;
  pendingSettlement: number;
};

const MoCard = () => {
  const [data, setData] = useState<MoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) return;

        const res = await fetch(`${BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const user = await res.json();
          setData({
            phone: user.phone ?? '—',
            tillNumber: user.tillNumber ?? '—',
            lastDeposit: user.lastDeposit ?? 0,
            lastDepositDate: user.lastDepositDate ?? '',
            pendingSettlement: user.pendingSettlement ?? 0,
          });
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    };

    fetchMoData();
  }, []);

  return (
    <View className="bg-emerald-900 rounded-2xl p-5" style={{ minWidth: 300 }}>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 bg-emerald-700 rounded-xl items-center justify-center">
            <Smartphone size={16} color="#6ee7b7" />
          </View>
          <Text className="text-white font-bold text-sm">M-Pesa Overview</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/mpesa')}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <Text className="text-emerald-400 text-xs mr-1">Details</Text>
          <ChevronRight size={12} color="#34d399" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="items-center py-4">
          <ActivityIndicator color="#34d399" />
        </View>
      ) : data ? (
        <>
          <View className="flex-row justify-between mb-3">
            <View>
              <Text className="text-emerald-400 text-xs mb-1">Phone</Text>
              <Text className="text-white font-medium text-sm">
                +254 {data.phone.replace(/^0/, '')}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-emerald-400 text-xs mb-1">Till No.</Text>
              <Text className="text-white font-medium text-sm">
                {data.tillNumber}
              </Text>
            </View>
          </View>

          <View className="border-t border-emerald-800 pt-3 flex-row justify-between">
            <View>
              <Text className="text-emerald-400 text-xs mb-1">
                Last Deposit
              </Text>
              <Text className="text-white font-bold text-base">
                KES {data.lastDeposit.toLocaleString()}
              </Text>
              {data.lastDepositDate ? (
                <Text className="text-emerald-500 text-xs mt-0.5">
                  {new Date(data.lastDepositDate).toLocaleDateString('en-KE', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              ) : null}
            </View>
            <View className="items-end">
              <Text className="text-emerald-400 text-xs mb-1">
                Pending Settlement
              </Text>
              <Text
                className={`font-bold text-base ${
                  data.pendingSettlement > 0
                    ? 'text-amber-400'
                    : 'text-emerald-300'
                }`}
              >
                KES {data.pendingSettlement.toLocaleString()}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <Text className="text-emerald-400 text-sm text-center py-2">
          M-Pesa data unavailable
        </Text>
      )}
    </View>
  );
};

export default MoCard;