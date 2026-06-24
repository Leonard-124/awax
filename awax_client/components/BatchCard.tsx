import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Calendar, ChevronRight } from "lucide-react-native";

interface BatchCardProps {
    batch: {
        id: number;
        name: string;
        status: string;
        date: string;
        recipients: number;
        amount: number
    };
    onPress: () => void;
}


export default function BatchCard({batch, onPress}: BatchCardProps) {
    const isCompleted = batch.status === "COMPLETED";

    return (
        <TouchableOpacity className="bg-white border-gray-200 rounded-2xl p-5 mb-4" onPress={onPress}>
            <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                        <View className={`w-3 h-3 rounded-full mr-2 ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500'}`}/>
                        <Text className="text-gray-900 font-bold text-lg">{batch.name}</Text>
                    </View>
                    <View className="flex-row items-center mb-1">
                        <Calendar size={14} color="#9ca3af"/>
                        <Text>{batch.date}</Text>
                        <Text>•</Text>
                        <Text>{batch.recipients} recipients</Text>
                    </View>
                </View>
                <View className={`px-3 py-1 rounded-full ${isCompleted ? 'bg-emerald-100' : 'bg-ambient-100'}`}>
                    <Text className={`text-xs font-bold ${isCompleted ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {batch.status}
                    </Text>
                </View>
            </View>
            <View className="flex-row items-center justify-between">
                <View>
                    <Text className="text-gray-500 text-xs mb-1">
                        {isCompleted ? "TOTAL DISBURSED" : "ESTIMATED TOTAL"}
                    </Text>
                    <Text className="text-gray-900 font-bold text-xl">KES {batch.amount.toLocaleString()}</Text>
                </View>
                <ChevronRight size={24} color="#d1d5db"/>
            </View>
        </TouchableOpacity>
    )
}