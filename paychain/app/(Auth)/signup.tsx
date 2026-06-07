// import { Text, View, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native'
// import React, { useState } from 'react'
// import { ArrowRightCircleIcon } from 'lucide-react-native'
// import { router } from "expo-router"
// import axios from "axios";

// const signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (field: any, value: any) => { //assigned type any
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (error) setError("");
//   };

//   const validateForm = () => {
//     if (!formData.username || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
//       setError("Please fill all fields!");
//       return false;
//     }
//     if (formData.username.length > 50) {
//       setError("Username must be less than 50 characters");
//       return false;
//     }
//     if (formData.password.length < 8) {
//       setError("Password must be at least 8 characters");
//       return false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError("Please enter a valid email");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     setLoading(true);
//     setError("");

//     try {
//       await axios.post("https://paychain-backend.onrender.com/register", {
//         username: formData.username,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password
//       });
//       setSuccess(true);
//       setTimeout(() => {
//         router.push("/");
//       }, 3000);
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.error || "Signup failed. Please try again.");
//       } else {
//         setError("An unexpected error occurred.");
//       }
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
//         <Text className="text-white font-medium text-sm mb-2">Secured.</Text>
//         <Text className="text-white font-medium text-sm mb-2">Pay.</Text>
//         <Text className="text-white font-medium text-sm mb-2">Grow.</Text>
//       </View>

//       <View className="bg-white rounded-t-3xl px-6 pb-20 min-h-screen tracking-[-2px]">
//         <Text className="text-xl font-bold text-gray-900 mb-2">
//           Sign Up <Text className="font-bold text-2xl text-[#e41111] animate-bounce">Now</Text> to Start using PayChain
//         </Text>

//         {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}

//         <Text className="text-gray-700 font-medium mb-2 text-sm">M-Pesa Phone:</Text>
//         <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
//           <Text className="text-gray-600 mr-2">+254</Text>
//           <TextInput
//             className="flex-1 text-gray-900 text-lg"
//             value={formData.phone}
//             onChangeText={(text) => handleChange("phone", text)}
//             keyboardType="phone-pad"
//           />
//         </View>

//         <Text className="text-gray-700 font-medium mb-2 text-sm">Gmail Address</Text>
//         <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
//           <TextInput
//             className="flex-1 text-gray-900 text-lg"
//             value={formData.email}
//             onChangeText={(text) => handleChange("email", text)}
//           />
//         </View>

//         <Text className="text-gray-700 font-medium mb-2 text-sm">FullName:</Text>
//         <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
//           <TextInput
//             className="flex-1 text-gray-900 text-lg"
//             value={formData.username}
//             onChangeText={(text) => handleChange("username", text)}
//           />
//         </View>

//         <Text className="text-gray-700 font-medium mb-2 text-sm">Password:</Text>
//         <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
//           <TextInput
//             className="flex-1 text-gray-900 text-lg"
//             value={formData.password}
//             onChangeText={(text) => handleChange("password", text)}
//             secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity onPress={() => setShowPassword((s) => !s)}>
//             <Text>{showPassword ? "Hide" : "Show"}</Text>
//           </TouchableOpacity>
//         </View>

//         <Text className="text-gray-700 font-medium mb-2 text-sm">Confirm Password:</Text>
//         <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
//           <TextInput
//             className="flex-1 text-gray-900 text-lg"
//             value={formData.confirmPassword}
//             onChangeText={(text) => handleChange("confirmPassword", text)}
//             secureTextEntry={!showPassword}
//           />
//         </View>

//         <TouchableOpacity
//           onPress={handleSubmit}
//           className="bg-emerald-800 rounded-2xl py-4 items-center flex-row justify-center"
//         >
//           <Text className="text-white font-bold text-lg mr-2">{loading ? "Signing Up..." : "Sign Up"}</Text>
//           <ArrowRightCircleIcon size={20} color="white" />
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default signup;

///////////////////////////////////////////////////////

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { ArrowRightCircleIcon } from "lucide-react-native";
import { router } from "expo-router";
import axios from "axios";

const BASE_URL = "https://paychain-backend.onrender.com";

type FormFields = {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<FormFields>({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    const { username, email, phone, password, confirmPassword } = formData;

    if (!username || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }
    if (username.trim().length >= 50) {
      setError("Username must be less than 50 characters");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setError("");

    try {
      await axios.post(`${BASE_URL}/register`, {
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      setSuccess(true);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Sign up failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View className="flex-1 bg-emerald-900 items-center justify-center px-6">
        <Text className="text-white text-3xl font-bold mb-4">🎉 Account Created!</Text>
        <Text className="text-emerald-200 text-center text-base">
          Your account has been created successfully. Redirecting to login...
        </Text>
      </View>
    );
  }

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
        <Text className="text-white font-bold text-4xl mt-4 mb-1">Secured.</Text>
        <Text className="text-emerald-300 font-bold text-4xl mb-1">Pay.</Text>
        <Text className="text-white font-bold text-4xl">Grow.</Text>
      </View>

      {/* Card */}
      <View className="bg-white rounded-t-3xl px-6 pt-8 pb-20 min-h-screen">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Create your PayChain account
        </Text>

        {error ? (
          <View className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            <Text className="text-red-600 text-sm">{error}</Text>
          </View>
        ) : null}

        <Text className="text-gray-700 font-medium mb-2 text-sm">
          M-Pesa Phone Number
        </Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-5">
          <Text className="text-gray-500 mr-2 font-medium">+254</Text>
          <TextInput
            className="flex-1 text-gray-900 text-base"
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="phone-pad"
            placeholder="712 345 678"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <Text className="text-gray-700 font-medium mb-2 text-sm">
          Email Address
        </Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-5">
          <TextInput
            className="flex-1 text-gray-900 text-base"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="you@example.com"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <Text className="text-gray-700 font-medium mb-2 text-sm">
          Full Name
        </Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-5">
          <TextInput
            className="flex-1 text-gray-900 text-base"
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
            autoCapitalize="words"
            placeholder="Jane Doe"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <Text className="text-gray-700 font-medium mb-2 text-sm">Password</Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-5">
          <TextInput
            className="flex-1 text-gray-900 text-base"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            placeholder="Min. 8 characters"
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity onPress={() => setShowPassword((s) => !s)}>
            <Text className="text-emerald-600 font-medium">
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-700 font-medium mb-2 text-sm">
          Confirm Password
        </Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-8">
          <TextInput
            className="flex-1 text-gray-900 text-base"
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            placeholder="Re-enter password"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
          className="bg-emerald-800 rounded-2xl py-4 items-center flex-row justify-center"
        >
          {loading ? (
            <ActivityIndicator color="white" style={{ marginRight: 8 }} />
          ) : null}
          <Text className="text-white font-bold text-lg mr-2">
            {loading ? "Creating Account..." : "Create Account"}
          </Text>
          {!loading && <ArrowRightCircleIcon size={20} color="white" />}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4 gap-2">
          <Text className="text-gray-600">Already have an account?</Text>
          <Text
            className="text-emerald-600 font-bold text-base"
            onPress={() => router.navigate("/")}
          >
            Sign In
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;