
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
// } from "react-native";
// import { router } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = "https://paychain-backend.onrender.com";

// type UserProfile = {
//   id: number;
//   username: string;
//   email: string;
//   phone: string;
//   kycVerified: boolean;
// };

// const Profile = () => {
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const token = await AsyncStorage.getItem("accessToken");
//       if (!token) {
//         router.replace("/");
//         return;
//       }

//       const res = await fetch(`${BASE_URL}/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.status === 401) {
//         // Try refresh
//         const refreshed = await tryRefreshToken();
//         if (!refreshed) {
//           router.replace("/");
//           return;
//         }
//         // Retry with new token
//         fetchProfile();
//         return;
//       }

//       if (!res.ok) {
//         setError("Failed to load profile. Please try again.");
//         return;
//       }

//       const data: UserProfile = await res.json();
//       setProfile(data);
//     } catch {
//       setError("Network error. Please check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const tryRefreshToken = async (): Promise<boolean> => {
//     try {
//       const refreshToken = await AsyncStorage.getItem("refreshToken");
//       if (!refreshToken) return false;

//       const res = await fetch(`${BASE_URL}/refresh`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: refreshToken }),
//       });

//       if (!res.ok) return false;

//       const data = await res.json();
//       await Promise.all([
//         AsyncStorage.setItem("accessToken", data.accessToken),
//         AsyncStorage.setItem("refreshToken", data.refreshToken),
//       ]);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const token = await AsyncStorage.getItem("refreshToken");
//       if (token) {
//         await fetch(`${BASE_URL}/logout`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token }),
//         });
//       }
//     } catch {
//       // Ignore logout API errors — still clear local storage
//     } finally {
//       await Promise.all([
//         AsyncStorage.removeItem("accessToken"),
//         AsyncStorage.removeItem("refreshToken"),
//       ]);
//       router.replace("/");
//     }
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 bg-white items-center justify-center">
//         <ActivityIndicator size="large" color="#059669" />
//         <Text className="text-gray-500 mt-3">Loading profile...</Text>
//       </View>
//     );
//   }

//   if (error || !profile) {
//     return (
//       <View className="flex-1 bg-white items-center justify-center px-6">
//         <Text className="text-red-500 text-center mb-4">
//           {error || "Something went wrong."}
//         </Text>
//         <TouchableOpacity
//           className="bg-emerald-600 rounded-xl px-6 py-3"
//           onPress={fetchProfile}
//         >
//           <Text className="text-white font-bold">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <StatusBar barStyle="dark-content" />

//       {/* Header */}
//       <View className="bg-emerald-900 px-6 pt-16 pb-12 items-center">
//         <View className="w-20 h-20 rounded-full bg-emerald-600 items-center justify-center mb-3">
//           <Text className="text-white text-3xl font-bold">
//             {profile.username.charAt(0).toUpperCase()}
//           </Text>
//         </View>
//         <Text className="text-white text-xl font-bold">{profile.username}</Text>
//         <Text className="text-emerald-300 text-sm mt-1">{profile.email}</Text>
//         <View
//           className={`mt-3 px-3 py-1 rounded-full ${
//             profile.kycVerified ? "bg-emerald-600" : "bg-amber-500"
//           }`}
//         >
//           <Text className="text-white text-xs font-semibold">
//             {profile.kycVerified ? "✓ KYC Verified" : "⚠ KYC Pending"}
//           </Text>
//         </View>
//       </View>

//       {/* Details */}
//       <View className="px-6 pt-6">
//         <Text className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">
//           Account Details
//         </Text>

//         <ProfileRow label="Full Name" value={profile.username} />
//         <ProfileRow label="Email Address" value={profile.email} />
//         <ProfileRow label="M-Pesa Phone" value={`+254 ${profile.phone}`} />
//         <ProfileRow label="Account ID" value={`#${profile.id}`} />
//         <ProfileRow
//           label="KYC Status"
//           value={profile.kycVerified ? "Verified" : "Pending Verification"}
//           valueClass={profile.kycVerified ? "text-emerald-600" : "text-amber-600"}
//         />

//         {!profile.kycVerified && (
//           <TouchableOpacity
//             className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 mt-2 mb-6"
//             onPress={() => router.push("/Verifykyc")} //verify_kyc
//           >
//             <Text className="text-amber-800 font-semibold text-center">
//               Complete KYC Verification →
//             </Text>
//           </TouchableOpacity>
//         )}

//         {/* Logout */}
//         <TouchableOpacity
//           className="mt-6 mb-10 border border-red-200 rounded-xl py-4 items-center"
//           onPress={handleLogout}
//           activeOpacity={0.8}
//         >
//           <Text className="text-red-500 font-bold text-base">Sign Out</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// type ProfileRowProps = {
//   label: string;
//   value: string;
//   valueClass?: string;
// };

// const ProfileRow = ({ label, value, valueClass }: ProfileRowProps) => (
//   <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
//     <Text className="text-gray-500 text-sm">{label}</Text>
//     <Text className={`text-gray-900 font-medium text-sm ${valueClass ?? ""}`}>
//       {value}
//     </Text>
//   </View>
// );

// export default Profile;

////////////////////////////////////////////////////////////////2

import React, { useEffect, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, StatusBar,
} from "react-native";
import { router } from "expo-router";
import { authedFetch, clearTokens, getRefreshToken } from "./auth";

const BASE_URL = "https://paychain-backend.onrender.com";

type UserProfile = {
  id: number;
  username: string;
  email: string;
  phone: string;
  kycVerified: boolean;
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authedFetch("/me");
      if (!res.ok) { setError("Failed to load profile. Please try again."); return; }
      setProfile(await res.json());
    } catch (err: any) {
      if (err?.message === "SESSION_EXPIRED") return; // authedFetch redirected
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = await getRefreshToken();
      if (token) {
        await fetch(`${BASE_URL}/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      }
    } catch {
      // Ignore — still clear local tokens
    } finally {
      await clearTokens();
      router.replace("/");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#059669" />
        <Text className="text-gray-500 mt-3">Loading your profile...</Text>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-red-500 text-center mb-4">{error || "Something went wrong."}</Text>
        <TouchableOpacity className="bg-emerald-600 rounded-xl px-6 py-3" onPress={fetchProfile}>
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="bg-emerald-900 px-6 pt-16 pb-12 items-center">
        <View className="w-20 h-20 rounded-full bg-emerald-600 items-center justify-center mb-3">
          <Text className="text-white text-3xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text className="text-white text-xl font-bold">{profile.username}</Text>
        <Text className="text-emerald-300 text-sm mt-1">{profile.email}</Text>
        <View className={`mt-3 px-3 py-1 rounded-full ${profile.kycVerified ? "bg-emerald-600" : "bg-amber-500"}`}>
          <Text className="text-white text-xs font-semibold">
            {profile.kycVerified ? "✓ KYC Verified" : "⚠ KYC Pending"}
          </Text>
        </View>
      </View>

      <View className="px-6 pt-6">
        <Text className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">
          Account Details
        </Text>
        <ProfileRow label="Full Name"     value={profile.username} />
        <ProfileRow label="Email Address" value={profile.email} />
        <ProfileRow label="M-Pesa Phone"  value={`+254 ${profile.phone}`} />
        <ProfileRow label="Account ID"    value={`#${profile.id}`} />
        <ProfileRow
          label="KYC Status"
          value={profile.kycVerified ? "Verified" : "Pending Verification"}
          valueClass={profile.kycVerified ? "text-emerald-600" : "text-amber-600"}
        />

        {!profile.kycVerified && (
          <TouchableOpacity
            className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 mt-2 mb-6"
            onPress={() => router.push("/Verifykyc")} //verify_kyc
          >
            <Text className="text-amber-800 font-semibold text-center">
              Complete KYC Verification →
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="mt-6 mb-10 border border-red-200 rounded-xl py-4 items-center"
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text className="text-red-500 font-bold text-base">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

type ProfileRowProps = { label: string; value: string; valueClass?: string };
const ProfileRow = ({ label, value, valueClass }: ProfileRowProps) => (
  <View className="flex-row justify-between items-center py-4 border-b border-gray-100">
    <Text className="text-gray-500 text-sm">{label}</Text>
    <Text className={`text-gray-900 font-medium text-sm ${valueClass ?? ""}`}>{value}</Text>
  </View>
);

export default Profile;