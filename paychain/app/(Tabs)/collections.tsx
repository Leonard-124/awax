
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function CollectionsScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-12">
        <Text className="text-gray-900 text-3xl font-bold mb-4">Collections</Text>
        <Text className="text-gray-600">View your transaction history and collection reports.</Text>
      </View>
    </ScrollView>
  );
}