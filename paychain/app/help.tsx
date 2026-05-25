
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { ArrowLeft, MessageCircle, Mail, Bell } from 'lucide-react-native';
import { router } from 'expo-router';
import FAQItem from '../components/FAQItem';
import { faqData } from '../constants/data';

export default function HelpScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="px-6 pt-12 pb-32">
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-gray-900 font-bold text-xl">Merchant Store</Text>
          </View>
          <Bell size={24} color="#374151" />
        </View>

        <Text className="text-gray-900 text-3xl font-bold mb-2">Help & Support</Text>
        <Text className="text-gray-600 mb-8">How can we assist your business growth today?</Text>

        <View className="bg-emerald-50 rounded-3xl p-6 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <MessageCircle size={32} color="#059669" />
            <View className="bg-emerald-500 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">FASTEST</Text>
            </View>
          </View>
          <Text className="text-gray-900 font-bold text-xl mb-2">Chat on WhatsApp</Text>
          <Text className="text-gray-600 text-sm mb-4">Mon-Fri 9am-5pm EAT.</Text>
          <TouchableOpacity className="bg-emerald-500 rounded-xl py-3 items-center">
            <Text className="text-white font-bold">Chat Now</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white border border-gray-200 rounded-3xl p-6 mb-8">
          <Mail size={32} color="#059669" className="mb-4" />
          <Text className="text-gray-900 font-bold text-xl mb-2">Email Support</Text>
          <Text className="text-gray-600 text-sm mb-4">hello@paychainke.co.ke</Text>
          <TouchableOpacity className="border-2 border-gray-900 rounded-xl py-3 items-center">
            <Text className="text-gray-900 font-bold">Send Email</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-gray-900 font-bold text-lg">Quick Answers</Text>
          <TouchableOpacity>
            <Text className="text-emerald-600 font-medium">FAQ</Text>
          </TouchableOpacity>
        </View>

        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.q} answer={faq.a} />
        ))}

        <View className="bg-emerald-100 rounded-3xl p-6 mt-6">
          <Text className="text-emerald-900 font-bold text-lg mb-2 italic">Expert help, just a tap away.</Text>
          <Text className="text-emerald-700 text-sm">AVAILABLE 24/7 FOR URGENT ISSUES</Text>
        </View>
      </View>
    </ScrollView>
  );
}