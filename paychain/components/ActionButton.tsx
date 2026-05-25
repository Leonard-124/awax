import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native'

interface ActionButtonProps {
    icon: LucideIcon;
    label: string;
    onPress: () => void;
}

export default function ActionButton({icon: Icon, label, onPress}: ActionButtonProps) {
    return (
        <TouchableOpacity className='items-center' onPress={onPress}>
            <View>
                <Icon size={24} color="#59669"/>
            </View>
            <Text className='text-white text-xs font-medium'>{label}</Text>
        </TouchableOpacity>
    )
}