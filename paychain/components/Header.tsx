import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bell } from "lucide-react-native";

interface HeaderProps {
    storeName?: string;
    greeting?: string;
    initials?: string;
    showNotification?: boolean;
}

export default function Header({
    storeName = "Leonard General Store",
    greeting = "Good morning 👋",
    initials = "LE",
    showNotification = true
}: HeaderProps) {
    return (
    <View className="flex-row items-center justify-between mb-8">
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-emerald-800 rounded-full items-center justify-center mr-3">
          <Text className="text-white font-bold">{initials}</Text>
        </View>
        <View>
          <Text className="text-emerald-200 text-xs">{greeting}</Text>
          <Text className="text-white font-bold text-base">{storeName}</Text>
        </View>
      </View>
      {showNotification && (
        <TouchableOpacity>
            <Bell size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
    )
}