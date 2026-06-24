
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { HelpCircle, Settings, FileText, Shield } from 'lucide-react-native';
import { router } from 'expo-router';

export default function MoreScreen() {
    const menuItems =[
        { icon: HelpCircle, label: "Help & Support", screen: "/help"},
        { icon: Settings, label: "Settings", screen: null },
        { icon: FileText, label: "Transaction History", screen: null },
        { icon: Shield, label: 'Security', screen: null},
    ];

    return (
        <ScrollView className='flex-1 bg-white'>
            <View className='px-6 pt-12'>
                <Text className='text-gray-900 text-3xl font-bold mb-6'>More</Text>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                    key={index}
                    className='bg-white border border-gray-200 rounded-2xl p-5 mb-3 flex-row items-center'
                    onPress={() => item.screen && router.push(item.screen as any)}
                    >
                        <View className='w-12 h-12 bg-emerald-50 rounded-full items-center justify-center mr-4'>
                            <item.icon size={24} color="#059669" />
                        </View>
                        <Text className='text-gray-900 font-bold text-lg flex-1'>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}