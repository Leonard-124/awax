



// import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native'
// import { useState } from 'react'
// import { Loader2Icon } from 'lucide-react-native'
// import { ArrowRightIcon } from 'lucide-react-native'
// import React from 'react'
// import { router } from 'expo-router'
// import axios from "axios"
// import * as ImagePicker from "expo-image-picker";
// import { Alert } from 'react-native'

// const veryfy_kyc = () => {
//     const [form, setForm] = useState({
//         imageUrl: null,
//         BussinessCertificate: "",
//         PinCertificate: "",
//         NationalId: "",
//         PassportCertificate: "",
//         BankAccountStatement: "",
//         BusinessPremisePhotograph: ""
//     })
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [success, setSuccess] = useState(false);

//     const handleChange = (field: any, value: any) => {
//         setForm((prev) => ({...prev, [field]: value}));
//         if (error) setError("");
//     };

//     /**
//      *File system
//      */
    

//     const handleFileChange = async () => {
//         const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (!permission.granted) {
//             Alert.alert("Permission required", "Please allow access to photos.");
//             return;
//         }

//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const file = result.assets[0];

//             if(file.fileSize && file.fileSize >= 1 * 1024 * 1024) {
//                 setError("Image must be less than 1MB")
//                 return;
//             }
//             setError("");
//             setForm({...form, imageUrl: file.uri});
//         }
//     }

//     const validateForm = () => {
//         if(!form.BussinessCertificate || !form.PinCertificate || !form.NationalId || !form.PassportCertificate || !form.BankAccountStatement || !form.BusinessPremisePhotograph) {
//             setError("Please fill all fields for eligibility!")
//             return false;
//         }
//         return true;
//     }

//     const handleSubmit = async () => {
//         if(!validateForm()) return;
//         setLoading(true);
//         setError("");

//         try {
//             await axios.post("http://localhost:4000/api/create", {
//                 BusinessCertificate: form.BussinessCertificate,
//                 PinCertificate: form.PinCertificate,
//                 NationalId: form.NationalId,
//                 PassportCertificate: form.PassportCertificate,
//                 BankAccountStatement: form.BankAccountStatement,
//                 gnt:form.BusinessPremisePhotograph
//             });
//             setSuccess(true)
//             setTimeout(() => {
//                 router.push("/(tabs)/home");
//             }, 3000);
//         } catch (err) {
//             if (axios.isAxiosError(err)) {
//                 setError(err.response?.data?.error || "Signup failed. Please try again.")
//             } else {
//                 setError("An unexpected error occured.");
//             }
//         }finally {
//             setLoading(false);
//         }
//     }

//   return (
//     <ScrollView className='flex-1 bg-emerald-900'>
//         <StatusBar barStyle="light-content"/>
//         <View className='px-6 pt-20 pb-10'>
//             <Text className='text-white text-sm font-medium mb-2'>PayChain</Text>
//             <Text className='text-white text-sm mb-1'>Hello Leon get you verified</Text>
//             <Text className='text-white font-medium text-sm mb-2'>Secured.</Text>
//             <Text className='text-white font-medium text-sm mb-2'>Pay.</Text>
//             <Text className='text-white font-medium text-sm mb-2'>Grow.</Text>
//         </View>
//         <View className='bg-white rounded-t-3xl px-6 pb-20 min-h-screen trackin-[-1px]'>
//             <Text className='text-xl font-bold mb-4'>Lets Get you verified</Text>
//             {error ? <Text className='text-red-500 mb-4'>{error}</Text> : null}
//             <Text className='text-gray-700 font-medium mb-2 text-sm'>Upload your National ID</Text>
//             <View className='flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6'>
//                 <TextInput className='flex-1 text-gray-900 text-lg'>
//                     value={form.NationalId}
//                     onPressIn={() => handleFileChange()}
//                 </TextInput>
//             </View>
//             <Text className='text-gray-700 font-medium mb-2 text-sm'>Upload your PIN Certificate</Text>
//             <View className='flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6'>
//                 <TextInput className='flex-1 text-gray-900 text-lg'>
//                     value={form.PinCertificate}
//                     onChangeText={(text) => handleChange("PinCertificate", text)}
//                 </TextInput>
//             </View>
//             <Text className='text-gray-700 font-medium mb-2 text-sm'>Upload your Passport Certificate</Text>
//             <View className='flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6'>
//                 <TextInput className='flex-1 text-gray-900 text-lg'>
//                     value={form.PassportCertificate}
//                     onChangeText={(text) => handleChange("PassportCertificate", text)}
//                 </TextInput>
//             </View>
//             <Text className='text-gray-700 font-medium mb-2 text-sm'>Upload your Business Premise Photograph</Text>
//             <View className='flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6'>
//                 <TextInput className='flex-1 text-gray-900 text-lg'>
//                     value={form.BusinessPremisePhotograph}
//                     onChangeText={(text) => handleChange("BusinessPremisePhotograph", text)}
//                 </TextInput>
//             </View>
//             <TouchableOpacity className='bg-emerald-500 rounded-lg py-4 mb-6' onPress={handleSubmit}>
//                 <Text className='text-white font-bold text-center'>Submit</Text>
//             </TouchableOpacity>
//         </View>
//         <Text className='text-emerald-500 font-bold text-center mb-6' onPress={() => router.push("/(tabs)/home")}>
//             Proceed to home
//         </Text>
//     </ScrollView>
//   )
// }

// export default veryfy_kyc;

// const styles = StyleSheet.create({})
//////////////////////////////////////////////////////
import { Text, View, TouchableOpacity, ScrollView, StatusBar, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const VerifyKyc = () => {
  const [form, setForm] = useState({
    imageUrl: null,
    BusinessCertificate: "",
    PinCertificate: "",
    NationalId: "",
    PassportCertificate: "",
    BankAccountStatement: "",
    BusinessPremisePhotograph: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: any, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleFileChange = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow access to photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      setForm((prev) => ({ ...prev, imageUrl: file.uri }));
    }
  };

  const validateForm = () => {
    const {
      BusinessCertificate,
      PinCertificate,
      NationalId,
      PassportCertificate,
      BankAccountStatement,
      BusinessPremisePhotograph,
      imageUrl
    } = form;

    if (
      !BusinessCertificate ||
      !PinCertificate ||
      !NationalId ||
      !PassportCertificate ||
      !BankAccountStatement ||
      !BusinessPremisePhotograph ||
      !imageUrl
    ) {
      setError("Please fill all fields and upload your ID image!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setError("");

    try {
      const payload = { ...form };
      await axios.post("https://paychain-backend.onrender.com/api/create", payload);
      router.push("/(Tabs)/home");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Submission failed. Please try again.");
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
        <Text className="text-white text-sm mb-1">Hello Leon, get you verified</Text>
        <Text className="text-white font-medium text-sm mb-2">Secured.</Text>
        <Text className="text-white font-medium text-sm mb-2">Pay.</Text>
        <Text className="text-white font-medium text-sm mb-2">Grow.</Text>
      </View>

      <View className="bg-white rounded-t-3xl px-6 pb-20 min-h-screen tracking-[-1px]">
        <Text className="text-xl font-bold mb-4">Let's Get You Verified</Text>
        {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

        <Text className="text-gray-700 font-medium mb-2 text-sm">Upload your National ID</Text>
        <TouchableOpacity
          className="flex-row items-center bg-white border border-gray-200 rounded-lg px-4 py-4 mb-6"
          onPress={handleFileChange}
        >
          <Text className="text-gray-900 text-lg">
            {form.imageUrl ? "Image Selected" : "Tap to select image"}
          </Text>
        </TouchableOpacity>

        <Text className="text-gray-700 font-medium mb-2 text-sm">ID Number</Text>
        <TextInput
          className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
          value={form.NationalId}
          onChangeText={(text) => handleChange("NationalId", text)}
        />

        <Text className="text-gray-700 font-medium mb-2 text-sm">PIN Certificate</Text>
        <TextInput
          className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
          value={form.PinCertificate}
          onChangeText={(text) => handleChange("PinCertificate", text)}
        />

        <Text className="text-gray-700 font-medium mb-2 text-sm">Passport Certificate</Text>
        <TextInput
          className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
          value={form.PassportCertificate}
          onChangeText={(text) => handleChange("PassportCertificate", text)}
        />

        <Text className="text-gray-700 font-medium mb-2 text-sm">Business Certificate</Text>
        <TextInput
          className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
          value={form.BusinessCertificate}
          onChangeText={(text) => handleChange("BusinessCertificate", text)}
        />

        <Text className="text-gray-700 font-medium mb-2 text-sm">Bank Account Statement</Text>
        <TextInput
          className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
          value={form.BankAccountStatement}
          onChangeText={(text) => handleChange("BankAccountStatement", text)}
        />

        <Text className="text-gray-700 font-medium mb-2 text-sm">Business Premise Photograph</Text>
        <TextInput
          className="flex-1 text-gray-900 text-lg border border-gray-200 rounded-lg px-4 py-4 mb-6"
          value={form.BusinessPremisePhotograph}
          onChangeText={(text) => handleChange("BusinessPremisePhotograph", text)}
        />

        <TouchableOpacity
          className="bg-emerald-500 rounded-lg py-4 mb-6"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold text-center">
            {loading ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        className="text-emerald-500 font-bold text-center mb-6"
        onPress={() => router.push("/(Tabs)/home")}
      >
        Proceed to home
      </Text>
    </ScrollView>
  );
};

export default VerifyKyc;


