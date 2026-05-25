import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Check, X } from 'lucide-react-native';

interface VerificationModalProps {
    visible: boolean;
    onClose: () => void;
    amount?: number;
    phone?: string;
    reference?: string;
    tillNumber?: string;
}

export default function VerificationModal({
    visible,
    onClose,
    amount = 1500,
    phone = '+254701***876',
    reference = 'QJX8475ty',
    tillNumber = "PYR2309T"
}: VerificationModalProps) {
    return (
        <Modal
        visible={visible}
        transparent
        animationType='fade'
        onRequestClose={onClose}
        >
            <View className='flex-1 bg-black/50 items-center justify-center px-6'>
            <View className='bg-white rounded-3xl p-8 w-full max-w-md'>
            <View className='w-16 h-16 bg-emerald-100 rounded-full items-center justify-center self-center mb-6'>
                <Check size={32} color="#059669" />
            </View>
            <Text className='text-gray-900 text-2xl font-bold text-center mb-2'>Payment Verified</Text>
            <Text className='text-gray-600 text-center mb-8'>Transaction settled successfully</Text>
            <View className='space-y-4 mb-8'>
                <View className='flex-row justify-between py-3 border-b border-gray-100'>
                    <Text className='text-gray-500 text-sm'>AMOUNT</Text>
                    <Text className='text-gray-900 font-bold'>KES {amount.toLocaleString()}.00</Text>
                </View>
                <View className='flex-row justify-between py-3 border-b border-gray-100'>
                    <Text className='text-gray-500 text-sm'>PHONE</Text>
                    <Text className='text-gray-900 font-bold'>{phone}</Text>
                </View>
                <View className='flex-row justify-between py-3 border-b border-gray-100'>
                    <Text className='text-gray-500 text-sm'>REFERENCE</Text>
                    <Text className='text-gray-900 font-bold'>{reference}</Text>
                </View>
                <View className='flex-row justify-between py-3'>
                    <Text className='text-gray-500 text-sm'>TILL NUMBER</Text>
                    <Text className='text-gray-900 font-bold'>{tillNumber}</Text>
                </View>
            </View>
            <View className='bg-emerald-50 rounded-xl p-4 mb-6 flex-row items-center'>
                <Check size={16} color="#059669" className="mr-2"/>
                <Text className='text-emerald-700 text-sm flex-1'>
                    Verified Via Paychain LITE API - Response latency: 65ms
                </Text>
            </View>
            <TouchableOpacity
            className='bg-emerald-700 rounded-2xl py-4 items-center'
            onPress={onClose}
            >
            <Text className='text-white font-bold text-lg'>Done</Text>
            </TouchableOpacity>
            </View>
            </View>
        </Modal>
    )
}