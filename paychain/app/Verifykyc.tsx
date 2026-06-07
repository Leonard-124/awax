
// import { Text, View, TouchableOpacity, ScrollView, StatusBar, TextInput, Alert } from 'react-native';
// import { useState } from 'react';
// import { router } from 'expo-router';
// import axios from "axios";
// import * as ImagePicker from "expo-image-picker";

// const VerifyKyc = () => {
//   const [form, setForm] = useState({
//     imageUrl: null,
//     BusinessCertificate: "",
//     PinCertificate: "",
//     NationalId: "",
//     PassportCertificate: "",
//     BankAccountStatement: "",
//     BusinessPremisePhotograph: ""
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (field: any, value: any) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//     if (error) setError("");
//   };

//   const handleFileChange = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission required", "Please allow access to photos.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const file = result.assets[0];
//       setForm((prev) => ({ ...prev, imageUrl: file.uri }));
//     }
//   };

//   const validateForm = () => {
//     const {
//       BusinessCertificate,
//       PinCertificate,
//       NationalId,
//       PassportCertificate,
//       BankAccountStatement,
//       BusinessPremisePhotograph,
//       imageUrl
//     } = form;

//     if (
//       !BusinessCertificate ||
//       !PinCertificate ||
//       !NationalId ||
//       !PassportCertificate ||
//       !BankAccountStatement ||
//       !BusinessPremisePhotograph ||
//       !imageUrl
//     ) {
//       setError("Please fill all fields and upload your ID image!");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     setLoading(true);
//     setError("");

//     try {
//       const payload = { ...form };
//       await axios.post("https://paychain-backend.onrender.com/api/create", payload);
//       router.push("/(Tabs)/home");
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.error || "Submission failed. Please try again.");
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
//         <Text className="text-white text-sm mb-1">Hello Leon, get you verified</Text>
//         <Text className="text-white font-medium text-sm mb-2">Secured.</Text>
//         <Text className="text-white font-medium text-sm mb-2">Pay.</Text>
//         <Text className="text-white font-medium text-sm mb-2">Grow.</Text>
//       </View>

//       <View className="bg-white rounded-t-3xl px-6 pb-20 min-h-screen tracking-[-1px]">
//         <Text className="text-xl font-bold mb-4">Let's Get You Verified</Text>
//         {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

//         <Text className="text-gray-700 font-medium mb-2 text-sm">Upload your National ID</Text>
//         <TouchableOpacity
//           className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6"
//           onPress={handleFileChange}
//         >
//           <Text className="text-gray-900 text-lg">
//             {form.imageUrl ? "Image Selected" : "Tap to select image"}
//           </Text>
//         </TouchableOpacity>

//         <Text className="text-gray-700 font-medium mb-2 text-sm">ID Number</Text>
//         <TextInput
//           className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
//           value={form.NationalId}
//           onChangeText={(text) => handleChange("NationalId", text)}
//         />

//         <Text className="text-gray-700 font-medium mb-2 text-sm">PIN Certificate</Text>
//         <TextInput
//           className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
//           value={form.PinCertificate}
//           onChangeText={(text) => handleChange("PinCertificate", text)}
//         />

//         <Text className="text-gray-700 font-medium mb-2 text-sm">Passport Certificate</Text>
//         <TextInput
//           className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
//           value={form.PassportCertificate}
//           onChangeText={(text) => handleChange("PassportCertificate", text)}
//         />

//         <Text className="text-gray-700 font-medium mb-2 text-sm">Business Certificate</Text>
//         <TextInput
//           className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
//           value={form.BusinessCertificate}
//           onChangeText={(text) => handleChange("BusinessCertificate", text)}
//         />

//         <Text className="text-gray-700 font-medium mb-2 text-sm">Bank Account Statement</Text>
//         <TextInput
//           className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
//           value={form.BankAccountStatement}
//           onChangeText={(text) => handleChange("BankAccountStatement", text)}
//         />

//         <Text className="text-gray-700 font-medium mb-2 text-sm">Business Premise Photograph</Text>
//         <TextInput
//           className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
//           value={form.BusinessPremisePhotograph}
//           onChangeText={(text) => handleChange("BusinessPremisePhotograph", text)}
//         />

//         <TouchableOpacity
//           className="bg-emerald-500 rounded-lg py-4 mb-6"
//           onPress={handleSubmit}
//         >
//           <Text className="text-white font-bold text-center">
//             {loading ? "Submitting..." : "Submit"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <Text
//         className="text-emerald-500 font-bold text-center mb-10"
//         onPress={() => router.push("/(Tabs)/home")}
//       >
//         Proceed to home
//       </Text>
//     </ScrollView>
//   );
// };

// export default VerifyKyc;

/////////////////////////////////////////////////////////////////


import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://paychain-backend.onrender.com";

type FormState = {
  imageUri: string | null;
  BusinessCertificate: string;
  PinCertificate: string;
  NationalId: string;
  PassportCertificate: string;
  BankAccountStatement: string;
  BusinessPremisePhotograph: string;
};

const VerifyKyc = () => {
  const [form, setForm] = useState<FormState>({
    imageUri: null,
    BusinessCertificate: "",
    PinCertificate: "",
    NationalId: "",
    PassportCertificate: "",
    BankAccountStatement: "",
    BusinessPremisePhotograph: "",
  });
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load the logged-in user's name so we don't hardcode "Leon"
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          router.replace("/");
          return;
        }
        const res = await fetch(`${BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || "");

          // If already KYC verified, skip this screen
          if (data.kycVerified) {
            router.replace("/(Tabs)/home");
          }
        } else {
          // Token expired/invalid — send back to login
          router.replace("/");
        }
      } catch {
        // Network issue — allow user to proceed, they can retry
      }
    };
    loadUser();
  }, []);

  const handleChange = (field: keyof Omit<FormState, "imageUri">, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library to upload your ID."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setForm((prev) => ({ ...prev, imageUri: result.assets[0].uri }));
      if (error) setError("");
    }
  };

  const validateForm = (): boolean => {
    const {
      BusinessCertificate,
      PinCertificate,
      NationalId,
      PassportCertificate,
      BankAccountStatement,
      BusinessPremisePhotograph,
      imageUri,
    } = form;

    if (
      !BusinessCertificate ||
      !PinCertificate ||
      !NationalId ||
      !PassportCertificate ||
      !BankAccountStatement ||
      !BusinessPremisePhotograph
    ) {
      setError("Please fill in all fields");
      return false;
    }
    if (!imageUri) {
      setError("Please upload a photo of your National ID");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        router.replace("/");
        return;
      }

      await axios.post(
        `${BASE_URL}/api/create`,
        {
          BusinessCertificate: form.BusinessCertificate,
          PinCertificate: form.PinCertificate,
          NationalId: form.NationalId,
          PassportCertificate: form.PassportCertificate,
          BankAccountStatement: form.BankAccountStatement,
          BusinessPremisePhotograph: form.BusinessPremisePhotograph,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      router.replace("/(Tabs)/home");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          // Token expired
          router.replace("/");
          return;
        }
        setError(err.response?.data?.error || "Submission failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
        {username ? (
          <Text className="text-emerald-300 text-base font-medium mb-1">
            Hello, {username} 👋
          </Text>
        ) : null}
        <Text className="text-white text-sm mb-1">Let's get you verified</Text>
        <Text className="text-white font-bold text-4xl mt-4 mb-1">Secured.</Text>
        <Text className="text-emerald-300 font-bold text-4xl mb-1">Pay.</Text>
        <Text className="text-white font-bold text-4xl">Grow.</Text>
      </View>

      {/* Card */}
      <View className="bg-white rounded-t-3xl px-6 pt-8 pb-20 min-h-screen">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          KYC Verification
        </Text>
        <Text className="text-gray-500 text-sm mb-6">
          Please provide your business documents to get verified. This is a
          one-time process.
        </Text>

        {error ? (
          <View className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            <Text className="text-red-600 text-sm">{error}</Text>
          </View>
        ) : null}

        {/* National ID Upload */}
        <Text className="text-gray-700 font-medium mb-2 text-sm">
          National ID Photo <Text className="text-red-500">*</Text>
        </Text>
        <TouchableOpacity
          className={`flex-row items-center border rounded-lg px-4 py-4 mb-6 ${
            form.imageUri
              ? "bg-emerald-50 border-emerald-300"
              : "bg-white border-gray-200"
          }`}
          onPress={handlePickImage}
          activeOpacity={0.7}
        >
          <Text
            className={`text-base ${
              form.imageUri ? "text-emerald-700 font-medium" : "text-gray-400"
            }`}
          >
            {form.imageUri ? "✅ ID Photo Selected" : "Tap to upload National ID photo"}
          </Text>
        </TouchableOpacity>

        {/* ID Number */}
        <Text className="text-gray-700 font-medium mb-2 text-sm">
          National ID Number <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="text-gray-900 text-base border border-gray-200 rounded-lg px-4 py-4 mb-5"
          value={form.NationalId}
          onChangeText={(text) => handleChange("NationalId", text)}
          keyboardType="numeric"
          placeholder="e.g. 12345678"
          placeholderTextColor="#9ca3af"
        />

        {/* PIN Certificate */}
        <Text className="text-gray-700 font-medium mb-2 text-sm">
          KRA PIN Certificate <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="text-gray-900 text-base border border-gray-200 rounded-lg px-4 py-4 mb-5"
          value={form.PinCertificate}
          onChangeText={(text) => handleChange("PinCertificate", text)}
          autoCapitalize="characters"
          placeholder="e.g. A012345678B"
          placeholderTextColor="#9ca3af"
        />

        {/* Passport Certificate */}
        <Text className="text-gray-700 font-medium mb-2 text-sm">
          Passport Number (if applicable)
        </Text>
        <TextInput
          className="text-gray-900 text-base border border-gray-200 rounded-lg px-4 py-4 mb-5"
          value={form.PassportCertificate}
          onChangeText={(text) => handleChange("PassportCertificate", text)}
          autoCapitalize="characters"
          placeholder="e.g. AB1234567"
          placeholderTextColor="#9ca3af"
        />

        {/* Business Certificate */}
        <Text className="text-gray-700 font-medium mb-2 text-sm">
          Business Registration Number <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="text-gray-900 text-base border border-gray-200 rounded-lg px-4 py-4 mb-5"
          value={form.BusinessCertificate}
          onChangeText={(text) => handleChange("BusinessCertificate", text)}
          placeholder="e.g. BN/2024/123456"
          placeholderTextColor="#9ca3af"
        />

        {/* Bank Account Statement */}
        <Text className="text-gray-700 font-medium mb-2 text-sm">
          Bank Account Number <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="text-gray-900 text-base border border-gray-200 rounded-lg px-4 py-4 mb-5"
          value={form.BankAccountStatement}
          onChangeText={(text) => handleChange("BankAccountStatement", text)}
          keyboardType="numeric"
          placeholder="e.g. 1234567890"
          placeholderTextColor="#9ca3af"
        />

        {/* Business Premise */}
        <Text className="text-gray-700 font-medium mb-2 text-sm">
          Business Premises Address <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className="text-gray-900 text-base border border-gray-200 rounded-lg px-4 py-4 mb-8"
          value={form.BusinessPremisePhotograph}
          onChangeText={(text) => handleChange("BusinessPremisePhotograph", text)}
          placeholder="e.g. Westlands, Nairobi"
          placeholderTextColor="#9ca3af"
          multiline
        />

        <TouchableOpacity
          className="bg-emerald-600 rounded-2xl py-4 items-center flex-row justify-center"
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="white" style={{ marginRight: 8 }} />
          ) : null}
          <Text className="text-white font-bold text-lg">
            {loading ? "Submitting..." : "Submit KYC Documents"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VerifyKyc;