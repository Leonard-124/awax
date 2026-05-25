// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar } from "react-native";
// import { ArrowRight } from "lucide-react-native"
// import { router } from "expo-router";

// export default function Loginscreen() {
//   const [form, setForm] = useState({email: "", password: ""});
//   const [error, setError] = useState("");

//   const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     const res = await fetch("http://localhost:4000/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json"},
//       body: JSON.stringify(form)
//     });
//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("accessToken", data.accessToken)
//       localStorage.setItem("refreshToken", data.refreshToken);
//       router.navigate("/(tabs)/home")
//     } else {
//       setError(data.error || "Login failed")
//     }
//   }

//   return (
//     <ScrollView className="flex-1 bg-emerald-900">
//       <StatusBar  barStyle="light-content"/>
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
//         <Text className="text-gray-700 font-medium mb-2 text-sm">M-PESA PHONE NUMBER</Text>
//         <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
//           <Text className="text-gray-600 mr-2">+254</Text>
//           <TextInput
//           className="flex-1 text-gray-900 text-lg"
//           value={handleChange}
//           onChangeText={Form.email}
//           keyboardType="phone-pad"
//           />
//         </View>

//         <Text className="text-gray-700 font-medium mb-2 text-sm">PASSWORD</Text>
//         <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-2">
//           <TextInput
//           className="flex-1 text-gray-900 text-lg"
//           value={handleChange}
//           onChangeText={form.password}
//           secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
//             <Text className="text-emerald-600">{'</>'}</Text>
//           </TouchableOpacity>
//         </View>
//         <Text className="text-gray-500 text-sm italic mb-6">First time? Use your temporary password.</Text>

//         <TouchableOpacity
//         className="bg-emerald-700 rounded-2xl py-4 items-center flex-row justify-center"
//         onPress={() => router.replace("/(tabs)/home")}
//         >
//           <Text className="text-white font-bold text-lg mr-2">Sign In</Text>
//           <ArrowRight size={20} color="white" />
//         </TouchableOpacity>
//         <View className="flex-row text-center font-semibold text-lg mt-3 gap-2">
//           <Text>Don't have an account?</Text>
//           <Text className="text-green-400 font-bold text-[16px]"  onPress={() => router.navigate("/signup")}>SignUp</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }
///////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { router } from "expo-router";

export default function Loginscreen() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: any, value: any) => { //changed implicit to any
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        // AsyncStorage is the RN equivalent of localStorage
        // import AsyncStorage from '@react-native-async-storage/async-storage'
        // await AsyncStorage.setItem("accessToken", data.accessToken);
        // await AsyncStorage.setItem("refreshToken", data.refreshToken);

        router.replace("/veryfy_kyc");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-emerald-900">
      <StatusBar barStyle="light-content" />
      <View className="px-6 pt-20 pb-10">
        <Text className="text-white text-sm font-medium mb-2">PayChain</Text>
        <Text className="text-white text-sm mb-1">MERCHANT PORTAL</Text>
        <Text className="text-white text-5xl font-bold mt-8 mb-2">Secured.</Text>
        <Text className="text-emerald-300 text-5xl font-bold mb-2">Pay. </Text>
        <Text className="text-white text-5xl font-bold">Grow.</Text>
      </View>

      <View className="bg-white rounded-t-3xl px-6 pt-8 pb-20 min-h-screen">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</Text>
        <Text className="text-gray-600 mb-6">
          Use your M-PESA phone number and the password provided during onboarding.
        </Text>

        <View className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded mb-6">
          <Text className="text-emerald-800 text-sm">
            No account? Access is provided by your PayChain onboarding officer after approval.
          </Text>
        </View>

        {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

        <Text className="text-gray-700 font-medium mb-2 text-sm">M-PESA PHONE NUMBER</Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
          <Text className="text-gray-600 mr-2">+254</Text>
          <TextInput
            className="flex-1 text-gray-900 text-lg"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="phone-pad"
          />
        </View>

        <Text className="text-gray-700 font-medium mb-2 text-sm">PASSWORD</Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-2">
          <TextInput
            className="flex-1 text-gray-900 text-lg"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text className="text-emerald-600">{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-500 text-sm italic mb-6">First time? Use your temporary password.</Text>

        <TouchableOpacity
          className="bg-emerald-700 rounded-2xl py-4 items-center flex-row justify-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold text-lg mr-2">Sign In</Text>
          <ArrowRight size={20} color="white" />
        </TouchableOpacity>

        <View className="flex-row text-center font-semibold text-lg mt-3 gap-2">
          <Text>Don't have an account?</Text>
          <Text
            className="text-green-400 font-bold text-[16px]"
            onPress={() => router.navigate("/signup")}
          >
            SignUp
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

