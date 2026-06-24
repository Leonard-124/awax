import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { Bell, Calendar, Check, Lock, TrendingUp, FileText, CreditCard } from 'lucide-react-native';

export default function AdvanceScreen() {
    return (
        <ScrollView className='flex-1 bg-white'>
            <StatusBar barStyle="dark-content" />
            <View className='px-6 pt-12 pb-32'>
                <View className='flex-row items-center justify-between mb-8'>
                    <View className='flex-row items-center'>
                        <View className='w-10 h-10 bg-emerald-100 rounded-full items-center justify-center'>
                          <Text className='text-emerald-700 font-bold'>PC</Text>  
                        </View>
                        <Text className='text-gray-900 font-bold text-lg ml-3'>PayChain</Text>
                    </View>
                    <Bell size={24} color="#374151"/>
                </View>

                <View className='bg-emerald-50 rounded-3xl p-6 mb-6 items-center'>
                    <View className='w-16 h-16 bg-emerald-200 rounded-full items-center justify-center mb-4'>
                        <TrendingUp size={32} color="#059669"/>
                    </View>
                    <Text className='text-gray-900 text-3xl font-bold mb-2'>Cash Advance</Text>
                    <Text className='text-gray-600  text-center text-sm'>Grow your bizz</Text>
                </View>

                <View className='bg-white border border-gray-200 rounded-2xl p-6 mb-6'>
                    <Text className='text-gray-500 text-xs mb-4'>ELIGIBILITY JOURNEY</Text>
                    <View className='flex-row items-center justify-between mb-6'>
                        {[1, 2, 3].map((month) => (
                            <View key={month} className='items-center'>
                                <View className={`w-12 h-12 rounded-full items-center justify-center ${month < 3 ? 'bg-emerald-600' : 'bg-gray-200'}`}>
                                    {month < 3 ? <Check size={20} color="white" /> : <Lock size={20} color="#9ca3af"/>}
                                </View>
                                <Text className={`text-xs mt-2 ${month < 3 ? 'text-emerald-600' : 'text-gray-400'}`}>Month {month}</Text>
                            </View>
                        ))}
                    </View>
                    <View className='bg-emerald-50 rounded-xl p-3 items-center'>
                        <Text className='text-emerald-700 text-sm font-medium'>You are here {'->'}</Text>
                    </View>
                </View>
                <View className='flex-row mb-6'>
                    <View className='flex-1 bg-gray-50 rounded-2xl p-5 mr-3'>
                        <Text className='text-gray-500 text-xs mb-2'>TRUST SCORE</Text>
                        <View className='flex-row items-baseline'>
                            <Text className='text-gray-900 text-3xl font-bold'>74</Text>
                            <Text className='text-emerald-600 text-sm ml-1'>/100</Text>
                        </View>
                    </View>
                    <View className="flex-1 bg-gray-50 rounded-2xl p-5">
                        <Text className="text-gray-500 text-xs mb-2">DAYS ACTIVE</Text>
                        <Text className="text-gray-900 text-3xl font-bold">68</Text>
                    </View>
                </View>

                <View className='bg-emerald-700 rounded-3xl p-6 mb-6'>
                    <View className='flex-row items-center justify-between mb-4'>
                        <Text className='text-emerald-100 text-xs'>EST. ELIGIBILITY DATE</Text>
                        <Calendar size={20} color="#d1fae5"/>
                    </View>
                    <Text className='text-white text-2xl font-bold'>12 Apr 2026</Text>
                </View>
                <Text className='text-gray-600 text-center text-sm mb-4'>
                    Keep collecting with <Text className='font-bold'>PayChain</Text> to unlock your first advance.
                </Text>
                 <View className='bg-white border border-gray-200 rounded-2xl p-6'>
                    <Text className='text-gray-900 font-bold text-lg mb-4'>The Capital Promise</Text>
                    {[
                        { Icon: FileText, title: 'No paperwork', desc: 'Everything is verified through your existing transaction history. No bank visits required.' },
                        { Icon: CreditCard, title: 'No fixed monthly fees', desc: "We don't charge interest. A single flat service fee is agreed upfront." },
                        { Icon: TrendingUp, title: 'Repay as you earn', desc: 'Repayments happen automatically as a small percentage of your daily sales.' }
                    ].map((item, i) => (
                        <View key={i} className='flex-row mb-4'>
                            <View className='w-10 h-10 bg-emerald-100 rounded-full items-center justify-center mr-4'>
                                <item.Icon size={20} color="#059669"/>
                            </View>
                            <View className='flex-1'>
                                <Text>{item.title}</Text>
                                <Text>{item.desc}</Text>
                            </View>
                        </View>
                    ))}
                 </View>
            </View>
        </ScrollView>
    );
}