import React from 'react';
import { Text, View } from 'react-native';

interface RevenueProps {
  type: 'today' | 'month' | 'transactions' | 'score';
  amount: number;
  month?: string;
  currency?: string;
}

export default function RevenueCard({
  type,
  amount,
  month,
  currency = 'KES',
}: RevenueProps) {
  const isToday = type === 'today';
  const isMonth = type === 'month';
  const isScore = type === 'score';
  const isTransaction = type === 'transactions';

  return (
    <View
      className={`
        ${isTransaction ? 'bg-[#e2dede]' : ''}
        ${isMonth ? 'bg-slate-400' : ''}
        ${isScore ? 'bg-[#f4f7eb]' : ''}
        ${isToday ? 'bg-[#f6f6f6]' : ''}
        rounded-3xl p-3 mr-4 w-52
      `}
    >
      <Text
        className={`
          ${isToday ? 'text-red-500' : ''}
          ${isMonth ? 'text-blue-500' : ''}
          ${isScore ? 'text-black' : ''}
          ${isTransaction ? 'text-red-700' : ''}
        `}
      >
        {isToday && "TODAY'S REVENUE"}
        {isMonth && 'THIS MONTH'}
        {isTransaction && 'TOTAL TRANSACTIONS'}
        {isScore && 'TRUST SCORE'}
      </Text>

      <Text>
        {isToday && `${currency} ${amount.toLocaleString()}`}
        {isMonth && `${currency} ${amount.toLocaleString()}`}
        {isTransaction && `${currency} ${amount.toLocaleString()}`}
        {isScore && `${amount.toLocaleString()} / 100`}
      </Text>

      {isTransaction && <Text>Since Oct 2025</Text>}
      {isScore && <Text>Eligible</Text>}
    </View>
  );
};

