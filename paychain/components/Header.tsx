// import React from 'react';
// import { View, Text, TouchableOpacity, Pressable } from 'react-native';
// import { Bell } from "lucide-react-native";
// import { router } from 'expo-router';

// interface HeaderProps {
//     storeName?: string;
//     greeting?: string;
//     initials?: string;
//     showNotification?: boolean;
// }

// export default function Header({
//     storeName = "Leonard General Store",
//     greeting = "Good morning 👋",
//     initials = "LE",
//     showNotification = true
// }: HeaderProps) {
//     return (
//     <View className="flex-row items-center justify-between mb-8">
//       <View className="flex-row items-center">
//         <View className="w-10 h-10 bg-emerald-800 rounded-full items-center justify-center mr-3">
//           <Pressable onPress={() => router.push("/(Auth)/Profile")}>
//             <Text className="text-white font-bold">{initials}</Text>
//           </Pressable>
//         </View>
//         <View>
//           <Text className="text-emerald-200 text-xs">{greeting}</Text>
//           <Text className="text-white font-bold text-base">{storeName}</Text>
//         </View>
//       </View>
//       {showNotification && (
//         <TouchableOpacity>
//             <Bell size={24} color="white" />
//         </TouchableOpacity>
//       )}
//     </View>
//     )
// }

////////////////////////////////////////////

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { router } from 'expo-router';

type HeaderProps = {
  username?: string;
};

const Header = ({ username = '' }: HeaderProps) => {
  const initial = username ? username.charAt(0).toUpperCase() : '?';
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center gap-3">
        {/* Avatar */}
        <TouchableOpacity
          onPress={() => router.push('/(Auth)/Profile')}
          activeOpacity={0.8}
          className="w-10 h-10 rounded-full bg-emerald-800 items-center justify-center"
        >
          <Text className="text-white font-bold text-base">{initial}</Text>
        </TouchableOpacity>

        <View>
          <Text className="text-emerald-200 text-xs">{greeting}</Text>
          <Text className="text-white font-bold text-sm">
            {username || 'Merchant'}
          </Text>
        </View>
      </View>

      {/* Notifications */}
      <TouchableOpacity
        onPress={() => router.push('/pay')}  
        activeOpacity={0.8}
        className="w-10 h-10 rounded-full bg-emerald-700 items-center justify-center"
      >
        <Bell size={18} color="white" /> 
      </TouchableOpacity>
    </View>
  );
};

export default Header;