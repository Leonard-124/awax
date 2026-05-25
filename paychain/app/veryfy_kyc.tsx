

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native'
import { useState } from 'react'
import { Loader2Icon } from 'lucide-react-native'
import { ArrowRightIcon } from 'lucide-react-native'
import React from 'react'
import { router } from 'expo-router'
import axios from "axios"

const veryfy_kyc = () => {
    const [form, setForm] = useState({
        BussinessCertificate: "",
        PinCertificate: "",
        NationalId: "",
        PassportCertificate: "",
        BankAccountStatement: "",
        BusinessPremisePhotograph: ""
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (field: any, value: any) => {
        setForm((prev) => ({...prev, [field]: value}));
        if (error) setError("");
    };

    const validateForm = () => {
        if(!form.BussinessCertificate || !form.PinCertificate || !form.NationalId || !form.PassportCertificate || !form.BankAccountStatement || !form.BusinessPremisePhotograph) {
            setError("Please fill all fields for eligibility!")
        }
        return true;
    }

    const handleSubmit = async () => {
        if(!validateForm) return;
        setLoading(true);
        setError("");

        try {
            await axios.post("http://localhost:4000/documents", {
                BusinessCertificate: form.BussinessCertificate,
                PinCertificate: form.PinCertificate,
                NationalId: form.NationalId,
                PassportCertificate: form.PassportCertificate,
                BankAccountStatement: form.BankAccountStatement,
                gnt:form.BusinessPremisePhotograph
            });
            setSuccess(true)
            setTimeout(() => {
                router.push("/(tabs)/home");
            }, 3000);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || "Signup failed. Please try again.")
            } else {
                setError("An unexpected error occured.");
            }
        }finally {
            setLoading(false);
        }
    }

  return (
    <ScrollView className='flex-1 bg-emerald-900'>
        <StatusBar barStyle="light-content"/>
        <View className='px-6 pt-20 pb-10'>
            <Text className=''>PayChain</Text>
            <Text className=''>Hello Leon get you verified</Text>
            <Text className=''>Secured.</Text>
            <Text className=''>Pay.</Text>
            <Text className=''>Grow.</Text>
        </View>
    </ScrollView>
  )
}

export default veryfy_kyc;

const styles = StyleSheet.create({})