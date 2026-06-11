
// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
// import { TrendingDown, CreditCard, ArrowUpDown, TrendingUp, Shield } from 'lucide-react-native';
// import { router } from 'expo-router';
// import Header from '../../components/Header';
// import ActionButton from '../../components/ActionButton';
// import BalanceCard from '../../components/BalanceCard';
// import VerificationModal from '../../components/VerificationModal';
// import  RevenueCard  from '../../components/RevenueCard';
// import RevenueChart from '@/components/RevenueChat';
// import Transachist from '@/components/Transachist';
// import MoCard from '@/components/MoCard';

// export default function HomeScreen() {
//     const [showVerificationModal, setShowVerificationModal] = useState(false);

//     return (
//         <ScrollView className='flex-1 bg-emerald-600'>
//             <StatusBar  barStyle="light-content" />
//             <View className='px-6 pt-12 pb-6'>
//                 <Header />
//                 <Text className='text-white text-5xl font-bold mb-2'>KES 178, 675</Text>
//                 <View className='flex-row items-center mb-6'>
//                     <Text className="text-emerald-200 text-sm mr-4">+KES 18,675</Text>
//                     <Text className="text-emerald-300 text-xs">TILL NO: PU674DF</Text>
//                 </View>

//             <View className='flex-row justify-between mb-6 font-semibold bg-[#509747] pb-4 px-2 rounded-2xl shadow-md'>
//                 <ActionButton
//                 icon={TrendingDown}
//                 label='MYTILLS'
//                 onPress={() => setShowVerificationModal(true)}
//                  />
//                  <ActionButton
//                  icon={CreditCard}
//                  label='TRUST'
//                  onPress={() => router.push('/bulk-payments')}
//                  />
//                  <ActionButton
//                  icon={ArrowUpDown}
//                  label='TRANSACTIONS'
//                  onPress={() => router.push("/swap")}
//                  />
//                  <ActionButton 
//                  icon={TrendingUp}
//                  label='WALLET'
//                  onPress={() => router.push('/swap')}
//                  />
//             </View>
//             </View>

//         <View className='bg-white rounded-t-3xl px-6 pt-6 pb-32'>
//             <TouchableOpacity className='bg-emerald-100 rounded-2xl p-5 mb-6 flex-row items-center justify-between'>
//                 <View>
//                     <Text className='text-emerald-900 font-bold text-lg mb-1'>Secured. Pay. Grow</Text>
//                     <Text className='text-emerald-700 text-xs'>MERCHANT ESTATE STATUS: ELITE</Text>
//                 </View>
//                 <Shield size={32} color="#059669"/>
//             </TouchableOpacity>

//         <View className='flex-row justify-between items-center mb-4'>
//             <Text className='text-gray-900 font-bold text-lg'>Digital Ledgers</Text>
//             <TouchableOpacity>
//                 <Text className='text-emerald-600 font-medium'>VIEW ALL</Text>
//             </TouchableOpacity>
//         </View>

//         <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
//             <BalanceCard type='operating' amount={18675} change={12.67}/>
//             <BalanceCard type='usdc' amount={325.90} change={-4.3}/>
//         </ScrollView>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
//             <RevenueCard type='today' amount={2057} />
//             <RevenueCard type='month' amount={2057} />
//             <RevenueCard type='transactions' amount={2057} />
//             <RevenueCard type='score' amount={2057} />
//         </ScrollView>
//         <ScrollView horizontal showsHorizontalScrollIndicator={true} className='mb-6'>
//             <RevenueChart />
//         </ScrollView>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
//             <Transachist />
//         </ScrollView>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-6'>
//             <MoCard />
//         </ScrollView>
//         </View>
//         <VerificationModal
//         visible={showVerificationModal}
//         onClose={() => setShowVerificationModal(false)}
//         />
//         </ScrollView>
//     );
// }

///////////////////////////////////////////////////////////////////////////////////////2

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   ActivityIndicator,
//   RefreshControl,
// } from 'react-native';
// import {
//   TrendingDown,
//   CreditCard,
//   ArrowUpDown,
//   TrendingUp,
//   Shield,
// } from 'lucide-react-native';
// import { router } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Header from '../../components/Header';
// import ActionButton from '../../components/ActionButton';
// import BalanceCard from '../../components/BalanceCard';
// import VerificationModal from '../../components/VerificationModal';
// import RevenueCard from '../../components/RevenueCard';
// import RevenueChart from '../../components/RevenueChat'; // Fixed: was RevenueChat
// import TransactionHistory from '../../components/Transachist'; // Fixed: was Transachist
// import MoCard from '../../components/MoCard';

// const BASE_URL = 'https://paychain-backend.onrender.com';

// type DashboardData = {
//   balance: number;
//   balanceChange: number;
//   tillNumber: string;
//   operatingBalance: number;
//   operatingChange: number;
//   usdcBalance: number;
//   usdcChange: number;
//   revenueToday: number;
//   revenueMonth: number;
//   totalTransactions: number;
//   trustScore: number;
//   merchantStatus: string;
//   kycVerified: boolean;
//   username: string;
// };

// const DEFAULT_DATA: DashboardData = {
//   balance: 0,
//   balanceChange: 0,
//   tillNumber: '—',
//   operatingBalance: 0,
//   operatingChange: 0,
//   usdcBalance: 0,
//   usdcChange: 0,
//   revenueToday: 0,
//   revenueMonth: 0,
//   totalTransactions: 0,
//   trustScore: 0,
//   merchantStatus: '—',
//   kycVerified: false,
//   username: '',
// };

// async function refreshAccessToken(): Promise<string | null> {
//   try {
//     const refreshToken = await AsyncStorage.getItem('refreshToken');
//     if (!refreshToken) return null;

//     const res = await fetch(`${BASE_URL}/refresh`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token: refreshToken }),
//     });
//     if (!res.ok) return null;

//     const data = await res.json();
//     await AsyncStorage.multiSet([
//       ['accessToken', data.accessToken],
//       ['refreshToken', data.refreshToken],
//     ]);
//     return data.accessToken;
//   } catch {
//     return null;
//   }
// }

// async function authedFetch(
//   url: string,
//   options: RequestInit = {}
// ): Promise<Response> {
//   let token = await AsyncStorage.getItem('accessToken');
//   if (!token) throw new Error('No access token');

//   let res = await fetch(url, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   // Token expired — try refresh once
//   if (res.status === 401) {
//     const newToken = await refreshAccessToken();
//     if (!newToken) throw new Error('SESSION_EXPIRED');

//     res = await fetch(url, {
//       ...options,
//       headers: {
//         ...options.headers,
//         Authorization: `Bearer ${newToken}`,
//         'Content-Type': 'application/json',
//       },
//     });
//   }

//   return res;
// }

// export default function HomeScreen() {
//   const [data, setData] = useState<DashboardData>(DEFAULT_DATA);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState('');
//   const [showVerificationModal, setShowVerificationModal] = useState(false);

//   const fetchDashboard = useCallback(async (isRefresh = false) => {
//     if (isRefresh) setRefreshing(true);
//     else setLoading(true);
//     setError('');

//     try {
//       const res = await authedFetch(`${BASE_URL}/me`);

//       if (!res.ok) {
//         throw new Error('Failed to load dashboard');
//       }

//       const user = await res.json();

//       // Map /me response to dashboard data
//       // Extend this once your backend returns full dashboard fields
//       setData((prev) => ({
//         ...prev,
//         username: user.username ?? prev.username,
//         kycVerified: user.kycVerified ?? prev.kycVerified,
//         tillNumber: user.tillNumber ?? prev.tillNumber,
//         merchantStatus: user.merchantStatus ?? 'ACTIVE',
//         balance: user.balance ?? prev.balance,
//         balanceChange: user.balanceChange ?? prev.balanceChange,
//         operatingBalance: user.operatingBalance ?? prev.operatingBalance,
//         operatingChange: user.operatingChange ?? prev.operatingChange,
//         usdcBalance: user.usdcBalance ?? prev.usdcBalance,
//         usdcChange: user.usdcChange ?? prev.usdcChange,
//         revenueToday: user.revenueToday ?? prev.revenueToday,
//         revenueMonth: user.revenueMonth ?? prev.revenueMonth,
//         totalTransactions: user.totalTransactions ?? prev.totalTransactions,
//         trustScore: user.trustScore ?? prev.trustScore,
//       }));
//     } catch (err: any) {
//       if (err?.message === 'SESSION_EXPIRED') {
//         await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
//         router.replace('/');
//         return;
//       }
//       setError('Failed to load dashboard. Pull down to refresh.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDashboard();
//   }, [fetchDashboard]);

//   const formattedBalance = data.balance.toLocaleString('en-KE', {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   });

//   const formattedChange = data.balanceChange >= 0
//     ? `+KES ${data.balanceChange.toLocaleString()}`
//     : `-KES ${Math.abs(data.balanceChange).toLocaleString()}`;

//   if (loading) {
//     return (
//       <View className="flex-1 bg-emerald-600 items-center justify-center">
//         <ActivityIndicator size="large" color="white" />
//         <Text className="text-white mt-3 text-sm">Loading dashboard...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="flex-1 bg-emerald-600"
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={() => fetchDashboard(true)}
//           tintColor="white"
//         />
//       }
//       showsVerticalScrollIndicator={false}
//     >
//       <StatusBar barStyle="light-content" />

//       {/* ── Top Hero ── */}
//       <View className="px-6 pt-12 pb-6">
//         <Header username={data.username} />

//         {error ? (
//           <View className="bg-red-500 rounded-xl px-4 py-3 mb-3">
//             <Text className="text-white text-xs">{error}</Text>
//           </View>
//         ) : null}

//         {/* Balance */}
//         <Text className="text-white text-5xl font-bold mb-2">
//           KES {formattedBalance}
//         </Text>
//         <View className="flex-row items-center mb-6">
//           <Text
//             className={`text-sm mr-4 ${
//               data.balanceChange >= 0 ? 'text-emerald-200' : 'text-red-300'
//             }`}
//           >
//             {formattedChange}
//           </Text>
//           <Text className="text-emerald-300 text-xs font-medium">
//             TILL NO: {data.tillNumber}
//           </Text>
//         </View>

//         {/* Action Buttons */}
//         <View className="flex-row justify-between mb-6 bg-[#509747] pb-4 px-2 rounded-2xl">
//           <ActionButton
//             icon={TrendingDown}
//             label="MY TILLS"
//             onPress={() => {
//               // Only prompt verification if KYC is not done
//               if (!data.kycVerified) {
//                 setShowVerificationModal(true);
//               } else {
//                 router.push('/tills');
//               }
//             }}
//           />
//           <ActionButton
//             icon={CreditCard}
//             label="TRUST"
//             onPress={() => router.push('/trust_score')}
//           />
//           <ActionButton
//             icon={ArrowUpDown}
//             label="TRANSACTIONS"
//             onPress={() => router.push('/transactions')} // Fixed: was /swap
//           />
//           <ActionButton
//             icon={TrendingUp}
//             label="WALLET"
//             onPress={() => router.push('/wallet')} // Fixed: was /swap (duplicate)
//           />
//         </View>
//       </View>

//       {/* ── White Card Section ── */}
//       <View className="bg-white rounded-t-3xl px-6 pt-6 pb-32">

//         {/* Merchant Status Banner */}
//         <TouchableOpacity
//           className="bg-emerald-100 rounded-2xl p-5 mb-6 flex-row items-center justify-between"
//           activeOpacity={0.8}
//           onPress={() => router.push('/trust_score')} //merchant-status
//         >
//           <View>
//             <Text className="text-emerald-900 font-bold text-lg mb-1">
//               Secured. Pay. Grow.
//             </Text>
//             <Text className="text-emerald-700 text-xs">
//               MERCHANT STATUS:{' '}
//               <Text className="font-bold">{data.merchantStatus.toUpperCase()}</Text>
//             </Text>
//           </View>
//           <Shield size={32} color="#059669" />
//         </TouchableOpacity>

//         {/* Digital Ledgers */}
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-gray-900 font-bold text-lg">Digital Ledgers</Text>
//           <TouchableOpacity onPress={() => router.push('/transactions')} activeOpacity={0.7}>
//             <Text className="text-emerald-600 font-medium text-sm">VIEW ALL</Text>
//           </TouchableOpacity>
//         </View>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           className="mb-6"
//         >
//           <BalanceCard
//             type="operating"
//             amount={data.operatingBalance}
//             change={data.operatingChange}
//           />
//           <BalanceCard
//             type="usdc"
//             amount={data.usdcBalance}
//             change={data.usdcChange}
//           />
//         </ScrollView>

//         {/* Revenue Cards */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           className="mb-6"
//         >
//           <RevenueCard type="today" amount={data.revenueToday} />
//           <RevenueCard type="month" amount={data.revenueMonth} />
//           <RevenueCard type="transactions" amount={data.totalTransactions} />
//           <RevenueCard type="score" amount={data.trustScore} />
//         </ScrollView>

//         {/* Revenue Chart */}
//         <View className="mb-6">
//           <RevenueChart />
//         </View>

//         {/* Transaction History */}
//         <View className="mb-6">
//           <TransactionHistory />
//         </View>

//         {/* Mo Card */}
//         <View className="mb-6">
//           <MoCard />
//         </View>
//       </View>

//       {/* Verification Modal — only shown for unverified users */}
//       <VerificationModal
//         visible={showVerificationModal}
//         onClose={() => setShowVerificationModal(false)}
//         onVerify={() => {
//           setShowVerificationModal(false);
//           router.push('/Verifykyc'); //was verify_kyc
//         }}
//       />
//     </ScrollView>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////3

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  TrendingDown,
  CreditCard,
  ArrowUpDown,
  TrendingUp,
  Shield,
} from 'lucide-react-native';
import { router } from 'expo-router';
import Header from '../../components/Header';
import ActionButton from '../../components/ActionButton';
import BalanceCard from '../../components/BalanceCard';
import VerificationModal from '../../components/VerificationModal';
import RevenueCard from '../../components/RevenueCard';
//import RevenueChart from '../../components/RevenueChart';
//import TransactionHistory from '../../components/TransactionHistory';
import RevenueChart from '../../components/RevenueChat'; 
import TransactionHistory from '../../components/Transachist'; 
import MoCard from '../../components/MoCard';
import { authedFetch } from  '../(Auth)/auth';

type DashboardData = {
  balance: number;
  balanceChange: number;
  tillNumber: string;
  operatingBalance: number;
  operatingChange: number;
  usdcBalance: number;
  usdcChange: number;
  revenueToday: number;
  revenueMonth: number;
  totalTransactions: number;
  trustScore: number;
  merchantStatus: string;
  kycVerified: boolean;
  username: string;
};

const DEFAULT_DATA: DashboardData = {
  balance: 0,
  balanceChange: 0,
  tillNumber: '—',
  operatingBalance: 0,
  operatingChange: 0,
  usdcBalance: 0,
  usdcChange: 0,
  revenueToday: 0,
  revenueMonth: 0,
  totalTransactions: 0,
  trustScore: 0,
  merchantStatus: '—',
  kycVerified: false,
  username: '',
};

export default function HomeScreen() {
  const [data, setData] = useState<DashboardData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const fetchDashboard = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      // authedFetch takes a PATH — not a full URL
      const res = await authedFetch('/me');

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to load dashboard');
      }

      const user = await res.json();

      setData((prev) => ({
        ...prev,
        username:          user.username          ?? prev.username,
        kycVerified:       user.kycVerified        ?? prev.kycVerified,
        tillNumber:        user.tillNumber         ?? prev.tillNumber,
        merchantStatus:    user.merchantStatus     ?? 'ACTIVE',
        balance:           user.balance            ?? prev.balance,
        balanceChange:     user.balanceChange      ?? prev.balanceChange,
        operatingBalance:  user.operatingBalance   ?? prev.operatingBalance,
        operatingChange:   user.operatingChange    ?? prev.operatingChange,
        usdcBalance:       user.usdcBalance        ?? prev.usdcBalance,
        usdcChange:        user.usdcChange         ?? prev.usdcChange,
        revenueToday:      user.revenueToday       ?? prev.revenueToday,
        revenueMonth:      user.revenueMonth       ?? prev.revenueMonth,
        totalTransactions: user.totalTransactions  ?? prev.totalTransactions,
        trustScore:        user.trustScore         ?? prev.trustScore,
      }));
    } catch (err: any) {
      if (err?.message === 'SESSION_EXPIRED') return; // authedFetch already redirected
      setError('Failed to load dashboard. Pull down to refresh.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const formattedBalance = data.balance.toLocaleString('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedChange =
    data.balanceChange >= 0
      ? `+KES ${data.balanceChange.toLocaleString()}`
      : `-KES ${Math.abs(data.balanceChange).toLocaleString()}`;

  if (loading) {
    return (
      <View className="flex-1 bg-emerald-600 items-center justify-center">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white mt-3 text-sm">Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-emerald-700"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => fetchDashboard(true)}
          tintColor="white"
        />
      }
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" />

      {/* ── Hero ── */}
      <View className="px-6 pt-12 pb-6">
        <Header username={data.username} />

        {error ? (
          <View className="bg-red-500 rounded-xl px-4 py-3 mb-3">
            <Text className="text-white text-xs">{error}</Text>
          </View>
        ) : null}

        <Text className="text-white text-5xl font-bold mb-2">
          KES {formattedBalance}
        </Text>
        <View className="flex-row items-center mb-6">
          <Text
            className={`text-sm mr-4 ${
              data.balanceChange >= 0 ? 'text-emerald-200' : 'text-red-300'
            }`}
          >
            {formattedChange}
          </Text>
          <Text className="text-emerald-300 text-xs font-medium">
            TILL NO: {data.tillNumber}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-6 bg-[#1b7a40] shadow-md b-[#509747] pb-4 px-2 rounded-2xl">
          <ActionButton
            icon={TrendingDown}
            label="MY TILLS"
            onPress={() => {
              if (!data.kycVerified) {
                setShowVerificationModal(true);
              } else {
                router.push('/tills');
              }
            }}
          />
          <ActionButton
            icon={CreditCard}
            label="TRUST"
            onPress={() => router.push('/trust_score')}
          />
          <ActionButton
            icon={ArrowUpDown}
            label="TRANSACTIONS"
            onPress={() => router.push('/transactions')}
          />
          <ActionButton
            icon={TrendingUp}
            label="WALLET"
            onPress={() => router.push('/wallet')}
          />
        </View>
      </View>

      {/* ── White Card ── */}
      <View className="bg-white rounded-t-3xl px-6 pt-6 pb-32">

        <TouchableOpacity
          className="bg-emerald-50 shadow-sm rounded-2xl p-5 mb-6 flex-row items-center justify-between"
          activeOpacity={0.8}
          onPress={() => router.push('/trust_score')}
        >
          <View>
            <Text className="text-emerald-900 font-bold text-lg mb-1">
              Secured. Pay. Grow.
            </Text>
            <Text className="text-emerald-700 text-xs">
              MERCHANT STATUS:{' '}
              <Text className="font-bold">{data.merchantStatus.toUpperCase()}</Text>
            </Text>
          </View>
          <Shield size={32} color="#059669" />
        </TouchableOpacity>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-900 font-bold text-lg">Digital Ledgers</Text>
          <TouchableOpacity onPress={() => router.push('/pay')} activeOpacity={0.7}>{/* ledger */}
            <Text className="text-emerald-800 font-medium text-sm">VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <BalanceCard type="operating" amount={data.operatingBalance} change={data.operatingChange} />
          <BalanceCard type="usdc"      amount={data.usdcBalance}      change={data.usdcChange} />
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <RevenueCard type="today"        amount={data.revenueToday} />
          <RevenueCard type="month"        amount={data.revenueMonth} />
          <RevenueCard type="transactions" amount={data.totalTransactions} />
          <RevenueCard type="score"        amount={data.trustScore} />
        </ScrollView>

        <View className="mb-6"><RevenueChart /></View>
        <View className="mb-6"><TransactionHistory /></View>
        <View className="mb-6"><MoCard /></View>
      </View>

      <VerificationModal
        visible={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onVerify={() => {
          setShowVerificationModal(false);
          router.push('/Verifykyc'); //verify_kyc
        }}
      />
    </ScrollView>
  );
}











 