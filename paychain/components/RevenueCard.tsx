// import React from 'react';
// import { Text, View } from 'react-native';

// interface RevenueProps {
//   type: 'today' | 'month' | 'transactions' | 'score';
//   amount: number;
//   month?: string;
//   currency?: string;
// }

// export default function RevenueCard({
//   type,
//   amount,
//   month,
//   currency = 'KES',
// }: RevenueProps) {
//   const isToday = type === 'today';
//   const isMonth = type === 'month';
//   const isScore = type === 'score';
//   const isTransaction = type === 'transactions';

//   return (
//     <View
//       className={`
//         ${isTransaction ? 'bg-[#e2dede]' : ''}
//         ${isMonth ? 'bg-slate-400' : ''}
//         ${isScore ? 'bg-[#f4f7eb]' : ''}
//         ${isToday ? 'bg-[#f6f6f6]' : ''}
//         rounded-3xl p-3 mr-4 w-52
//       `}
//     >
//       <Text
//         className={`
//           ${isToday ? 'text-red-500' : ''}
//           ${isMonth ? 'text-blue-500' : ''}
//           ${isScore ? 'text-black' : ''}
//           ${isTransaction ? 'text-red-700' : ''}
//         `}
//       >
//         {isToday && "TODAY'S REVENUE"}
//         {isMonth && 'THIS MONTH'}
//         {isTransaction && 'TOTAL TRANSACTIONS'}
//         {isScore && 'TRUST SCORE'}
//       </Text>

//       <Text>
//         {isToday && `${currency} ${amount.toLocaleString()}`}
//         {isMonth && `${currency} ${amount.toLocaleString()}`}
//         {isTransaction && `${currency} ${amount.toLocaleString()}`}
//         {isScore && `${amount.toLocaleString()} / 100`}
//       </Text>

//       {isTransaction && <Text>Since Oct 2025</Text>}
//       {isScore && <Text>Eligible</Text>}
//     </View>
//   );
// };

//////////////////////////////////////////////////////////////


import React from 'react';
import { View, Text } from 'react-native';
import { Sun, Calendar, ArrowUpDown, Star } from 'lucide-react-native';

type RevenueCardProps = {
  type: 'today' | 'month' | 'transactions' | 'score';
  amount: number;
};

const CONFIG = {
  today: {
    label: "Today's Revenue",
    icon: Sun,
    color: '#f59e0b',
    bg: 'bg-amber-50',
    format: (n: number) => `KES ${n.toLocaleString()}`,
  },
  month: {
    label: 'Monthly Revenue',
    icon: Calendar,
    color: '#8b5cf6',
    bg: 'bg-violet-50',
    format: (n: number) => `KES ${n.toLocaleString()}`,
  },
  transactions: {
    label: 'Transactions',
    icon: ArrowUpDown,
    color: '#0ea5e9',
    bg: 'bg-sky-50',
    format: (n: number) => n.toLocaleString(),
  },
  score: {
    label: 'Trust Score',
    icon: Star,
    color: '#10b981',
    bg: 'bg-emerald-50',
    format: (n: number) => `${Math.min(100, Math.round(n))}/100`,
  },
};

const RevenueCard = ({ type, amount }: RevenueCardProps) => {
  const config = CONFIG[type];
  const Icon = config.icon;

  return (
    <View
      className={`${config.bg} rounded-2xl p-4 mr-3`}
      style={{ width: 160 }}
    >
      <View
        className="w-9 h-9 rounded-xl items-center justify-center mb-3"
        style={{ backgroundColor: `${config.color}22` }}
      >
        <Icon size={18} color={config.color} />
      </View>
      <Text className="text-gray-900 font-bold text-base mb-1" numberOfLines={1}>
        {config.format(amount)}
      </Text>
      <Text className="text-gray-500 text-xs">{config.label}</Text>
    </View>
  );
};

export default RevenueCard;