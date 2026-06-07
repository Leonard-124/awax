
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { TrendingDown, CreditCard, ArrowUpDown, TrendingUp, Shield } from 'lucide-react-native';
import { router } from 'expo-router';
import Header from '../../components/Header';
import ActionButton from '../../components/ActionButton';
import BalanceCard from '../../components/BalanceCard';
import VerificationModal from '../../components/VerificationModal';
import  RevenueCard  from '../../components/RevenueCard';
import RevenueChart from '@/components/RevenueChat';
import Transachist from '@/components/Transachist';
import MoCard from '@/components/MoCard';

export default function HomeScreen() {
    const [showVerificationModal, setShowVerificationModal] = useState(false);

    return (
        <ScrollView className='flex-1 bg-emerald-600'>
            <StatusBar  barStyle="light-content" />
            <View className='px-6 pt-12 pb-6'>
                <Header />
                <Text className='text-white text-5xl font-bold mb-2'>KES 178, 675</Text>
                <View className='flex-row items-center mb-6'>
                    <Text className="text-emerald-200 text-sm mr-4">+KES 18,675</Text>
                    <Text className="text-emerald-300 text-xs">TILL NO: PU674DF</Text>
                </View>

            <View className='flex-row justify-between mb-6 font-semibold bg-[#509747] pb-4 px-2 rounded-2xl shadow-md'>
                <ActionButton
                icon={TrendingDown}
                label='MYTILLS'
                onPress={() => setShowVerificationModal(true)}
                 />
                 <ActionButton
                 icon={CreditCard}
                 label='TRUST'
                 onPress={() => router.push('/bulk-payments')}
                 />
                 <ActionButton
                 icon={ArrowUpDown}
                 label='TRANSACTIONS'
                 onPress={() => router.push("/swap")}
                 />
                 <ActionButton 
                 icon={TrendingUp}
                 label='WALLET'
                 onPress={() => router.push('/swap')}
                 />
            </View>
            </View>

        <View className='bg-white rounded-t-3xl px-6 pt-6 pb-32'>
            <TouchableOpacity className='bg-emerald-100 rounded-2xl p-5 mb-6 flex-row items-center justify-between'>
                <View>
                    <Text className='text-emerald-900 font-bold text-lg mb-1'>Secured. Pay. Grow</Text>
                    <Text className='text-emerald-700 text-xs'>MERCHANT ESTATE STATUS: ELITE</Text>
                </View>
                <Shield size={32} color="#059669"/>
            </TouchableOpacity>

        <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-gray-900 font-bold text-lg'>Digital Ledgers</Text>
            <TouchableOpacity>
                <Text className='text-emerald-600 font-medium'>VIEW ALL</Text>
            </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
            <BalanceCard type='operating' amount={18675} change={12.67}/>
            <BalanceCard type='usdc' amount={325.90} change={-4.3}/>
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
            <RevenueCard type='today' amount={2057} />
            <RevenueCard type='month' amount={2057} />
            <RevenueCard type='transactions' amount={2057} />
            <RevenueCard type='score' amount={2057} />
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} className='mb-6'>
            <RevenueChart />
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
            <Transachist />
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
            <MoCard />
        </ScrollView>
        </View>
        <VerificationModal
        visible={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        />
        </ScrollView>
    );
}















        {/* <View className='bg-gray-50 rounded-2xl p-5'>
            <Text className='text-gray-500 text-xs mb-1'>TODAY'S PERFORMANCE</Text>
        <View className='flex-row justify-between mt-3'>
            <View>
                <Text className="text-gray-500 text-xs mb-1">REVENUE</Text>
                <Text className="text-emerald-600 font-bold text-lg">KES 21,330</Text>
            </View>
            <View>
                <Text className="text-gray-500 text-xs mb-1">PAYMENTS</Text>
                <Text className="text-gray-900 font-bold text-lg">12</Text>
            </View>
            <View>
                <Text className="text-gray-500 text-xs mb-1">AVG TICKET</Text>
                <Text className="text-gray-900 font-bold text-lg">KES 1,739</Text>
            </View>
        </View>
        </View> */}