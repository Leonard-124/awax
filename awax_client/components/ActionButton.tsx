// import React from 'react';
// import { TouchableOpacity, Text, View } from 'react-native';
// import { LucideIcon } from 'lucide-react-native'

// interface ActionButtonProps {
//     icon: LucideIcon;
//     label: string;
//     onPress: () => void;
// }

// export default function ActionButton({icon: Icon, label, onPress}: ActionButtonProps) {
//     return (
//         <TouchableOpacity className='items-center' onPress={onPress}>
//             <View>
//                 <Icon size={24} color="#59669"/>
//             </View>
//             <Text className='text-white text-xs font-medium'>{label}</Text>
//         </TouchableOpacity>
//     )
// }

////////////////////////////////

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

type ActionButtonProps = {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

const ActionButton = ({ icon: Icon, label, onPress, disabled = false }: ActionButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
    className="items-center pt-4 px-2"
    style={{ minWidth: 64 }}
  >
    <View
      className={`w-12 h-12 rounded-2xl items-center justify-center mb-2 ${
        disabled ? 'bg-emerald-800' : 'bg-emerald-600'
      }`}
    >
      <Icon size={22} color={disabled ? '#6ee7b7' : 'white'} />
    </View>
    <Text
      className={`text-xs font-semibold text-center ${
        disabled ? 'text-emerald-500' : 'text-white'
      }`}
      numberOfLines={1}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default ActionButton;