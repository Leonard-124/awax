import { Text, View, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native'
import React, { useState } from 'react'
import { ArrowRightCircleIcon } from 'lucide-react-native'
import { router } from "expo-router"
import axios from "axios";

const signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: any, value: any) => { //assigned type any
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Please fill all fields!");
      return false;
    }
    if (formData.username.length > 50) {
      setError("Username must be less than 50 characters");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:4000/register", {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Signup failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-emerald-900">
      <StatusBar barStyle="light-content" />
      <View className="px-6 pt-20 pb-10">
        <Text className="text-white text-sm font-medium mb-2">PayChain</Text>
        <Text className="text-white text-sm mb-1">MERCHANT PORTAL</Text>
        <Text className="text-white font-medium text-sm mb-2">Secured.</Text>
        <Text className="text-white font-medium text-sm mb-2">Pay.</Text>
        <Text className="text-white font-medium text-sm mb-2">Grow.</Text>
      </View>

      <View className="bg-white rounded-t-3xl px-6 pb-20 min-h-screen tracking-[-2px]">
        <Text className="text-xl font-bold text-gray-900 mb-2">
          Sign Up <Text className="font-bold text-2xl text-[#e41111] animate-bounce">Now</Text> to Start using PayChain
        </Text>

        {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}

        <Text className="text-gray-700 font-medium mb-2 text-sm">M-Pesa Phone:</Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
          <Text className="text-gray-600 mr-2">+254</Text>
          <TextInput
            className="flex-1 text-gray-900 text-lg"
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="phone-pad"
          />
        </View>

        <Text className="text-gray-700 font-medium mb-2 text-sm">Gmail Address</Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
          <TextInput
            className="flex-1 text-gray-900 text-lg"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>

        <Text className="text-gray-700 font-medium mb-2 text-sm">FullName:</Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
          <TextInput
            className="flex-1 text-gray-900 text-lg"
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
          />
        </View>

        <Text className="text-gray-700 font-medium mb-2 text-sm">Password:</Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
          <TextInput
            className="flex-1 text-gray-900 text-lg"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword((s) => !s)}>
            <Text>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-700 font-medium mb-2 text-sm">Confirm Password:</Text>
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6">
          <TextInput
            className="flex-1 text-gray-900 text-lg"
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry={!showPassword}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-emerald-800 rounded-2xl py-4 items-center flex-row justify-center"
        >
          <Text className="text-white font-bold text-lg mr-2">{loading ? "Signing Up..." : "Sign Up"}</Text>
          <ArrowRightCircleIcon size={20} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default signup;
