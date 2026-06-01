import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { TextInput } from 'react-native';



export default function PayScreen() {

  return (
    <ScrollView  className="flex-1 bg-white">
      <View  className="px-6 pt-12">
        <Text className="text-gray-900 text-3xl font-bold mb-4">Pay</Text>

        <Animated.View
          entering={FadeIn.duration(600)}
          exiting={FadeOut.duration(600)}
          layout={LinearTransition.springify()}
        >
          <TouchableOpacity
            className="bg-emerald-600 rounded-2xl p-6"
            onPress={() => router.push("/bulk-payments")}
          >
            <Text className="text-white font-bold text-lg">Bulk Payments</Text>
            <Text className="text-emerald-100 mt-2">Manage payees and batches</Text>
          </TouchableOpacity>

          <TextInput
          multiline
          numberOfLines={3}
          placeholder='Enter text'
          textAlignVertical='top'
          style={{ minHeight:100 }}
          />
        </Animated.View>
      </View>
    </ScrollView>
  );
}