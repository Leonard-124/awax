
// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar } from "react-native";
// import { ArrowRight } from "lucide-react-native";
// import { router } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage"


// export default function Loginscreen() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (field: any, value: any) => { //changed implicit to any
//     setForm((prev) => ({ ...prev, [field]: value }));
//     if (error) setError("");
//   };

//   const handleSubmit = async () => {
//     setError("");
//     try {
//       const res = await fetch("https://paychain-backend.onrender.com/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         await AsyncStorage.setItem("accessToken", data.accessToken);
//         await AsyncStorage.setItem("refreshToken", data.refreshToken);
//         router.replace("/veryfy_kyc");
//       } else {
//         setError(data.error || "Login failed");
//       }
//     } catch (err) {
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView className="flex-1 bg-emerald-900">
//       <StatusBar barStyle="light-content" />
//       <View className="px-6 pt-20 pb-10">
//         <Text className="text-white text-sm font-medium mb-2">PayChain</Text>
//         <Text className="text-white text-sm mb-1">MERCHANT PORTAL</Text>
//         <Text className="text-white text-5xl font-bold mt-8 mb-2">Secured.</Text>
//         <Text className="text-emerald-300 text-5xl font-bold mb-2">Pay. </Text>
//         <Text className="text-white text-5xl font-bold">Grow.</Text>
//       </View>

//       <View className="bg-white rounded-t-3xl px-6 pt-8 pb-20 min-h-screen">
//         <Text className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</Text>
//         <Text className="text-gray-600 mb-6">
//           Use your M-PESA phone number and the password provided during onboarding.
//         </Text>

//         <View className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded mb-6">
//           <Text className="text-emerald-800 text-sm">
//             No account? Access is provided by your PayChain onboarding officer after approval.
//           </Text>
//         </View>

//         {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

//         <Text className="text-gray-700 font-medium mb-2 text-sm">Enter Email</Text>
//         <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
//           {/* <Text className="text-gray-600 mr-2">+254</Text> */}
//           <TextInput
//             className="flex-1 text-gray-900 text-lg"
//             value={form.email}
//             onChangeText={(text) => handleChange("email", text)}
//           />
//         </View>

//         <Text className="text-gray-700 font-medium mb-2 text-sm">PASSWORD</Text>
//         <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-2">
//           <TextInput
//             className="flex-1 text-gray-900 text-lg"
//             value={form.password}
//             onChangeText={(text) => handleChange("password", text)}
//             secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Text className="text-emerald-600">{showPassword ? "Hide" : "Show"}</Text>
//           </TouchableOpacity>
//         </View>

//         <Text className="text-gray-500 text-sm italic mb-6">First time? Use your temporary password.</Text>

//         <TouchableOpacity
//           className="bg-emerald-700 rounded-2xl py-4 items-center flex-row justify-center"
//           onPress={handleSubmit}
//         >
        
//           <Text className="text-white font-bold text-lg mr-2">{loading ? "Signing In..." : "Sign In"}</Text>
//           <ArrowRight size={20} color="white" />
//         </TouchableOpacity>

//         <View className="flex-row text-center font-semibold text-lg mt-3 gap-2">
//           <Text>Don't have an account?</Text>
//           <Text
//             className="text-green-400 font-bold text-[16px]"
//             onPress={() => router.navigate("/signup")}
//           >
//             SignUp
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

/////////////////////////////////////////////////////

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { ArrowRight } from "lucide-react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://paychain-backend.onrender.com";

export default function LoginScreen() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async () => {
    if (!form.email.trim() || !form.password) {
      setError("Email and password are required");
      return;
    }

    setError("");
    setLoading(true); // ← was missing before

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Persist both tokens
        await AsyncStorage.multiSet([
          ["accessToken", data.accessToken],
          ["refreshToken", data.refreshToken],
        ]);

        // Skip KYC screen if already verified
        if (data.kycVerified) {
          router.replace("/(Tabs)/home");
        } else {
          router.replace("/Verifykyc"); //was verify_kyc
        }
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-emerald-900"
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle="light-content" />

      {/* Hero */}
      <View className="px-6 pt-20 pb-10">
        <Text className="text-white text-sm font-medium mb-2">PayChain</Text>
        <Text className="text-white text-sm mb-1">MERCHANT PORTAL</Text>
        <Text className="text-white text-5xl font-bold mt-8 mb-2">Secured.</Text>
        <Text className="text-emerald-300 text-5xl font-bold mb-2">Pay.</Text>
        <Text className="text-white text-5xl font-bold">Grow.</Text>
      </View>

      {/* Card */}
      <View className="bg-white rounded-t-3xl px-6 pt-8 pb-20 min-h-screen">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Sign in to your account
        </Text>
        <Text className="text-gray-600 mb-6">
          Use your registered email and password to access the merchant portal.
        </Text>

        <View className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded mb-6">
          <Text className="text-emerald-800 text-sm">
            No account? Contact your PayChain onboarding officer for access.
          </Text>
        </View>

        {error ? (
          <View className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            <Text className="text-red-600 text-sm">{error}</Text>
          </View>
        ) : null}

        <Text className="text-gray-700 font-medium mb-2 text-sm">
          Email Address
        </Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
          <TextInput
            className="flex-1 text-gray-900 text-base"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="you@example.com"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <Text className="text-gray-700 font-medium mb-2 text-sm">Password</Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-2">
          <TextInput
            className="flex-1 text-gray-900 text-base"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="••••••••"
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity onPress={() => setShowPassword((s) => !s)}>
            <Text className="text-emerald-600 font-medium">
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-400 text-xs italic mb-6">
          First time? Use your temporary password from the onboarding email.
        </Text>

        <TouchableOpacity
          className="bg-emerald-700 rounded-2xl py-4 items-center flex-row justify-center"
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="white" style={{ marginRight: 8 }} />
          ) : null}
          <Text className="text-white font-bold text-lg mr-2">
            {loading ? "Signing In..." : "Sign In"}
          </Text>
          {!loading && <ArrowRight size={20} color="white" />}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4 gap-2">
          <Text className="text-gray-600">Don't have an account?</Text>
          <Text
            className="text-emerald-600 font-bold text-base"
            onPress={() => router.navigate("/signup")}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}