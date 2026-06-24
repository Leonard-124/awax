import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ChevronRight } from "lucide-react-native"

interface PayeeCardProps {
    payee: {
        id: number;
        name: string;
        type: string;
        amount: number;
        initials: string;
    };
    onPress: () => void;
    isSelected?: boolean
}

export default function PayeeCard({payee, onPress, isSelected = false}: PayeeCardProps) {
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'EMPLOYEE': return {bg: 'bg-emerald-100', text: 'text-emerald-700' };
            case 'SUPPLIER': return {bg: 'bg-blue-100', text: 'text-blue-700' };
            case 'UTILITY': return {bg: 'bg-amber-100', text: 'text-amber-700' };
            default: return {bg: 'bg-gray-100', text: 'text-gray-700' };
        }
    };

    const colors = getTypeColor(payee.type)

    return (
        <TouchableOpacity className={`bg-white border-2 ${isSelected ? 'border-emerald-500' : 'border-gray-200'} rounded-2xl p-5 mb-4 flex-row items-center justify-between`} onPress={onPress}>
            <View className='flex-row items-center flex-1'>
                <View className={`w-12 h-12 ${colors.bg} rounded-full items-center justify-center mr-4`}>
                    <Text className={`${colors.text}`}>{payee.initials}</Text>
                </View>
                <View className='flex-1'>
                    <Text className='text-gray-900 font-bold mb-1'>{payee.name}</Text>
                    <View className='flex-row items-center'>
                        <Text className='text-gray-500 text-xs mr-2'>Last paid:</Text>
                        <Text className='text-gray-900 font-bold text-sm'>KES {payee.amount.toLocaleString()}</Text>
                    </View>
                </View>
            </View>
            <View className='items-end'>
                <View className={`px-3 py-1 rounded-full ${colors.bg}`}>
                    <Text className={`text-xs font-bold ${colors.text}`}>{payee.type}</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" className="mt-2"/>
            </View>
        </TouchableOpacity>
    )
}