import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function PayScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-12">
        <Text className="text-gray-900 text-3xl font-bold mb-4">Pay</Text>
        <TouchableOpacity 
          className="bg-emerald-600 rounded-2xl p-6"
          onPress={() => router.push('/bulk-payments')}
        >
          <Text className="text-white font-bold text-lg">Bulk Payments</Text>
          <Text className="text-emerald-100 mt-2">Manage payees and batches</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}