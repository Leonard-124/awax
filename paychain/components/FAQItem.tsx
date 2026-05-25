import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

interface FAQItemProps {
    question: string;
    answer: string;
}

export default function FAQItem({question, answer}: FAQItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <TouchableOpacity
        className='bg-white border border-gray-200 rounded-2xl p-5 mb-3'
        onPress={()=> setIsExpanded(!isExpanded)}
        >
            <View className='flex-row items-center justify-between'>
                <Text className='text-gray-900 font-bold flex-1 mr-4'>{question}</Text>
                <View className={`transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown size={20} color="#6B7280"/>
                </View>
            </View>
            {isExpanded && (
                <Text className='text-gray-600 mt-3 leading-6'>{answer}</Text>
            )}
        </TouchableOpacity>
    )
}